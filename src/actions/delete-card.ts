import { eq } from "drizzle-orm";
import { check, pipe, string } from "valibot";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { FormSubmitAction } from "@/components/ui/form";
import { validateSchema } from "@/lib/valibot";
import { Card } from "@/db/schemas/card";
import { getTranslations } from "@/services/translations";

export function deleteCardAction(
  cardId: string,
  matcher: string
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
          (value) => value === matcher,
          translations["card-actions"]["delete-match-error"]
        )
      ),
      rawName
    );
    if (errors) return { errors };
    await db.delete(Card).where(eq(Card.id, cardId));
    redirect("/");
  };
}
