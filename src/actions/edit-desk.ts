import { redirect } from "next/navigation";
import { minLength, pipe, string } from "valibot";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Desk } from "@/db/schemas/desk";
import { FormSubmitAction } from "@/components/ui/form";
import { validateSchema } from "@/lib/valibot";
import { getTranslations } from "@/services/translations";

export function editDeskAction(deskId: string): FormSubmitAction {
  return async (formState, formData) => {
    "use server";
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
    await db
      .update(Desk)
      .set({
        updated_at: Date.now(),
        name,
      })
      .where(eq(Desk.id, deskId));
    redirect("/");
  };
}
