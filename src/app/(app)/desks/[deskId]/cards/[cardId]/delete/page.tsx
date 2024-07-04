import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { Card } from "@/db/schemas/card";
import { DeleteCardForm } from "@/components/cards/delete";
import { Desk } from "@/db/schemas/desk";
import { getSessionData } from "@/services/session";
import { Main } from "@/components/ui/main";

export default async function Page({
  params: { cardId },
}: {
  params: { cardId: string };
}) {
  const sessionData = await getSessionData();
  if (!sessionData) return notFound();
  const { user } = sessionData;
  const card = await db.query.card.findFirst({
    where: eq(Card.id, cardId),
  });
  if (!card) return notFound();
  const desk = await db.query.desk.findFirst({
    where: eq(Desk.id, card.deskId),
  });
  if (!desk || desk.userId !== user.id) return notFound();
  return (
    <Main>
      <DeleteCardForm data={card} />
    </Main>
  );
}
