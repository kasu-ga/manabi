"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { check, minLength, pipe, string } from "valibot";

import { FormSubmitAction } from "@/components/ui/form";
import { db } from "@/db";
import { User } from "@/db/schemas/user";
import { Languages } from "@/lib/consts";
import { SessionCookie } from "@/lib/cookies";
import { validateSchema } from "@/lib/valibot";
import { getSessionData } from "@/services/session";
import { revalidatePath } from "next/cache";

export const changeLanguageAction: FormSubmitAction = async (
  formState,
  formData
) => {
  if (!formData) return formState;
  const languages = Object.keys(Languages);
  const [errors, language] = await validateSchema(
    pipe(
      string(),
      minLength(2),
      check((v) => languages.includes(v), "Invalid")
    ),
    formData.get("language")
  );
  if (errors) return { errors };
  const sessionData = await getSessionData();
  if (!sessionData) return formState;
  const { session, user } = sessionData;
  await db
    .update(User)
    .set({
      language,
    })
    .where(eq(User.id, user.id));
  cookies().set(
    "session",
    await SessionCookie.encode({
      session,
      user: {
        ...user,
        language,
      },
    })
  );
  cookies().set("language", language);
  revalidatePath("/settings");
  return { errors: {} };
};
