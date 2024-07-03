import { eq } from "drizzle-orm";
import { check, pipe, string } from "valibot";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { Desk } from "@/db/schemas/desk";
import { FormSubmitAction } from "@/components/ui/form";
import { validateSchema } from "@/lib/valibot";
import { Card } from "@/db/schemas/card";
import { getTranslations } from "@/services/translations";

export function deleteDeskAction(
  deskId: string,
  deskName: string
): FormSubmitAction {
  return async (formState, formData) => {
    "use server";
    if (!formData) return formState;
    const translations = await getTranslations();
    const rawName = formData.get("name");
    const [errors] = await validateSchema(
      pipe(
        string(),
        check(
          (value) => value === deskName,
          translations["desk-actions"]["name-does-not-match"]
        )
      ),
      rawName
    );
    if (errors) return { errors };
    await db.delete(Card).where(eq(Card.deskId, deskId));
    await db.delete(Desk).where(eq(Desk.id, deskId));
    redirect("/");
  };
}
