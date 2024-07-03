"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { object, string } from "valibot";

import { FormSubmitAction } from "@/components/ui/form";
import { validateSchema } from "@/lib/valibot";
import { mixe } from "@/lib/mixe";
import { getTranslations } from "@/services/translations";

export const signInAction: FormSubmitAction = async (formState, formData) => {
  if (!formData) return formState;
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const translations = await getTranslations();
  const [errors, data] = await validateSchema(
    object({
      email: string(),
      password: string(),
    }),
    body
  );
  if (errors) return { errors };
  data.email = data.email.toLowerCase().trim();
  try {
    const res = await mixe.authentication.signin(data);
    if ("code" in res) return formState;
    cookies().set("access_token", res.access_token);
    cookies().set("refresh_token", res.refresh_token);
    redirect("/");
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return {
      errors: {
        root: translations.signin["email-or-password-invalid"],
      },
    };
  }
};
