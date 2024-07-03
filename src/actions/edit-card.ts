import { eq } from "drizzle-orm";
import { instance, check, object, optional, pipe, string } from "valibot";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { Card } from "@/db/schemas/card";
import { FormSubmitAction } from "@/components/ui/form";
import { removeEmptyFiles } from "@/lib/clear";
import { validateAudioExtname, validateImageExtname } from "@/lib/extname";
import { submitCardFiles } from "@/lib/submit-card-files";
import { validateSchema } from "@/lib/valibot";
import { getTranslations } from "@/services/translations";

export function editCardAction(cardId: string): FormSubmitAction {
  return async (formState, formData) => {
    "use server";
    if (!formData) return formState;
    const body = {
      frontText: formData.get("frontText"),
      frontReading: formData.get("frontReading"),
      frontAudio: formData.get("frontAudio"),
      frontImage: formData.get("frontImage"),
      backText: formData.get("backText"),
      backReading: formData.get("backReading"),
      backAudio: formData.get("backAudio"),
      backImage: formData.get("backImage"),
    };
    const translations = await getTranslations();
    const [errors, values] = await validateSchema(
      object({
        frontText: optional(string()),
        frontReading: optional(string()),
        backText: optional(string()),
        backReading: optional(string()),

        frontImage: optional(
          pipe(
            instance(File),
            check(
              (file) => validateImageExtname(file),
              translations["card-actions"]["invalid-image-extname"]
            )
          )
        ),
        frontAudio: optional(
          pipe(
            instance(File),
            check(
              (file) => validateAudioExtname(file),
              translations["card-actions"]["invalid-audio-extname"]
            )
          )
        ),
        backImage: optional(
          pipe(
            instance(File),
            check(
              (file) => validateImageExtname(file),
              translations["card-actions"]["invalid-image-extname"]
            )
          )
        ),
        backAudio: optional(
          pipe(
            instance(File),
            check(
              (file) => validateAudioExtname(file),
              translations["card-actions"]["invalid-audio-extname"]
            )
          )
        ),
      }),
      removeEmptyFiles(body)
    );

    if (errors) return { errors };

    const { backAudio, frontAudio, backImage, frontImage, ...newData } = values;
    const files = await submitCardFiles(cardId, values);
    await db
      .update(Card)
      .set({
        updated_at: Date.now(),
        ...newData,
        ...files,
      })
      .where(eq(Card.id, cardId));
    redirect("/");
  };
}
