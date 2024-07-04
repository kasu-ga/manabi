"use server";

import { db } from "@/db";
import { Card, SelectCard } from "@/db/schemas/card";
import { Desk } from "@/db/schemas/desk";
import { and, eq, inArray, isNull, lt, not } from "drizzle-orm";
import { getSessionData } from "./session";

export async function getCardsToStudy(
  deskId: string
): Promise<Array<SelectCard> | null> {
  const today = new Date();

  const desk = await db.query.desk.findFirst({
    where: eq(Desk.id, deskId),
  });

  if (!desk) return null;

  const sessionData = await getSessionData();
  if (!sessionData) return null;
  const { user } = sessionData;
  if (desk.userId !== user.id) return null;

  const newCards = await db.query.card.findMany({
    where: and(eq(Card.deskId, deskId), eq(Card.isNew, 1)),
    limit: 10,
  });

  const cardsToReview = await db.query.card.findMany({
    where: and(
      eq(Card.deskId, deskId),
      not(isNull(Card.lastPerformanceRating)),
      lt(Card.nextReviewDate, today.getTime())
    ),
  });

  today.setHours(0, 0, 0, 0);

  const isNewDay = (desk.lastReviewDate ?? 0) < today.getTime();

  if (
    (newCards.length === 0 && isNewDay) ||
    newCards.length + cardsToReview.length === 0
  ) {
    const additionalNewCards = await db.query.card.findMany({
      where: and(eq(Card.deskId, deskId), isNull(Card.lastPerformanceRating)),
      limit: 10,
    });
    if (additionalNewCards.length > 0) {
      await db
        .update(Card)
        .set({
          isNew: 1,
        })
        .where(
          inArray(
            Card.id,
            additionalNewCards.map((c) => c.id)
          )
        );
      newCards.push(...additionalNewCards);
    }
  }

  await db
    .update(Desk)
    .set({
      lastReviewDate: Date.now(),
    })
    .where(eq(Desk.id, deskId));

  return [...newCards, ...cardsToReview];
}
