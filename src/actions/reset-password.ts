import { eq } from "drizzle-orm";
import { email, minLength, object, pipe, string } from "valibot";
import { redirect } from "next/navigation";
import { SessionData, TokenType } from "mixejs";

import { db } from "@/db";
import { getSessionData } from "@/services/session";
import { FormSubmitAction } from "@/components/ui/form";
import { mixe } from "@/lib/mixe";
import { cookies } from "next/headers";
import { User } from "@/db/schemas/user";
import { validateSchema } from "@/lib/valibot";
import { SessionCookie } from "@/lib/cookies";
import { getTranslations } from "@/services/translations";

export function validateResetPasswordCodeAction(
  session: SessionData
): FormSubmitAction {
  return async (formState, formData) => {
    "use server";
    if (!formData) return formState;
    const [errors, data] = await validateSchema(
      object({
        code: string(),
        password: pipe(string(), minLength(2, "Contraseña demasiado corta")),
      }),
      {
        code: formData.get("code"),
        password: formData.get("password"),
      }
    );
    if (errors) return { errors };
    const isValid = await mixe.utils.validateResetPasswordCode(
      session.id,
      data.code
    );
    if (!isValid)
      return {
        errors: {
          root: "Código incorrecto",
        },
      };
    await db
      .update(User)
      .set({
        password: await mixe.password.hash(data.password),
      })
      .where(eq(User.id, session.userId));
    await mixe.session.invalidate(session.id);
    redirect("/sign-in");
  };
}

export const sendResetPasswordCodeAction: FormSubmitAction = async (
  formState,
  formData
) => {
  "use server";
  if (!formData) return formState;
  const [errors, userEmail] = await validateSchema(
    pipe(string(), email("Email invalido")),
    formData.get("email")
  );
  if (errors) return { errors };
  const translations = await getTranslations();
  const user = await db.query.user.findFirst({
    where: eq(User.email, userEmail.toLowerCase().trim()),
  });
  if (!user)
    return {
      errors: {
        root: translations["reset-password"]["user-not-found"],
      },
    };
  const currentSession = await getSessionData(false);
  const session = currentSession
    ? currentSession.session
    : await mixe.session.create(user.id, { limited: true });
  const code = await mixe.utils.createResetPasswordCode(session.id);
  const access_token = await mixe.tokens.create(
    session.id,
    TokenType.AccessToken
  );
  cookies().set("access_token", access_token);
  cookies().set(
    "session",
    await SessionCookie.encode({
      user,
      session,
    })
  );
  cookies().delete("refresh_token");
  console.log({ code });
  redirect("/change-password");
};
