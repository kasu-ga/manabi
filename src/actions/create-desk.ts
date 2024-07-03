"use server";

import { redirect } from "next/navigation";
import { minLength, pipe, string } from "valibot";

import { db } from "@/db";
import { Desk } from "@/db/schemas/desk";
import { FormSubmitAction } from "@/components/ui/form";
import { validateSchema } from "@/lib/valibot";
import { getSessionData } from "@/services/session";
import { getTranslations } from "@/services/translations";
import { count, eq } from "drizzle-orm";

export const createDeskAction: FormSubmitAction = async (
  formState,
  formData
) => {
  if (!formData) return formState;
  const translations = await getTranslations();
  const rawName = formData.get("name");
  const [errors, name] = await validateSchema(
    pipe(
      string(),
      minLength(2, translations["desk-actions"]["name-too-short"])
    ),
    rawName
  );
  if (errors) return { errors };
  const { user } = await getSessionData();
  const desks = await db
    .select({ count: count() })
    .from(Desk)
    .where(eq(Desk.userId, user.id));
  if (desks[0].count >= 3)
    return {
      errors: {
        root: translations["desk-actions"]["limit-exceeded"],
      },
    };
  await db.insert(Desk).values({
    userId: user.id,
    name,
  });
  redirect("/");
};
