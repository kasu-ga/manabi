"use server";

import { db } from "@/db";
import { Card } from "@/db/schemas/card";
import { eq } from "drizzle-orm";

const defaultAdditionalTime = {
  1: 0,
  2: 60000,
  3: 300000,
  4: 43200000,
  5: 86400000,
};

const multipler = {
  1: 1,
  2: 1.25,
  3: 1.5,
  4: 1.75,
  5: 2,
};

function calculateNextReviewDate(
  lastPerformanceRating: keyof typeof defaultAdditionalTime,
  newPerformanceRating: keyof typeof multipler
): number {
  const averageRating = (lastPerformanceRating + newPerformanceRating) / 2;
  const additionalTime =
    defaultAdditionalTime[newPerformanceRating] *
    multipler[Math.round(averageRating) as keyof typeof multipler];
  return Date.now() + additionalTime;
}

export async function processCardReview(
  cardId: string,
  newPerformanceRating: number
) {
  const card = await db.query.card.findFirst({
    where: eq(Card.id, cardId),
  });
  if (!card) {
    throw new Error("Card not found");
  }

  const nextReviewDate = calculateNextReviewDate(
    (card.lastPerformanceRating || 1) as keyof typeof multipler,
    newPerformanceRating as keyof typeof multipler
  );

  await db
    .update(Card)
    .set({
      lastReviewDate: Date.now(),
      lastPerformanceRating: newPerformanceRating,
      nextReviewDate,
      isNew: 0,
    })
    .where(eq(Card.id, cardId));
}
