import shortId from "short-uuid";
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
import { count, eq } from "drizzle-orm";

export function createCardAction(deskId: string): FormSubmitAction {
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
    const cards = await db
      .select({ count: count() })
      .from(Card)
      .where(eq(Card.deskId, deskId));
    if (cards[0].count >= 500)
      return {
        errors: {
          root: translations["card-actions"]["limit-exceeded"],
        },
      };
    const { backAudio, frontAudio, backImage, frontImage, ...newData } = values;
    const cardId = shortId.generate();
    const files = await submitCardFiles(cardId, values);
    await db.insert(Card).values({
      id: cardId,
      deskId,
      ...newData,
      ...files,
    });
    redirect("/");
  };
}
