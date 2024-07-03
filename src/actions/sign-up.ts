"use server";

import uniqid from "uniqid";
import { redirect } from "next/navigation";
import { email, minLength, object, pipe, string } from "valibot";
import { cookies } from "next/headers";

import { FormSubmitAction } from "@/components/ui/form";
import { validateSchema } from "@/lib/valibot";
import { mixe } from "@/lib/mixe";
import { getTranslations } from "@/services/translations";

export const signUpAction: FormSubmitAction = async (formState, formData) => {
  if (!formData) return formState;
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const translations = await getTranslations();
  const [errors, data] = await validateSchema(
    object({
      email: pipe(string(), email(translations.signup["invalid-email"])),
      password: pipe(
        string(),
        minLength(8, translations.signup["invalid-password"])
      ),
    }),
    body
  );
  if (errors) return { errors };
  data.email = data.email.toLowerCase().trim();
  try {
    const res = await mixe.authentication.signup({
      id: uniqid(),
      ...data,
    });
    cookies().set("access_token", res.access_token);
    cookies().set("refresh_token", res.refresh_token);
    redirect("/");
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return {
      errors: {
        root: translations.signup["email-already-exists"],
      },
    };
  }
};
