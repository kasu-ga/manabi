import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { Desk } from "@/db/schemas/desk";

import { CreateCardForm } from "@/components/cards/create";
import { getSessionData } from "@/services/session";
import { Main } from "@/components/ui/main";

export default async function Page({
  params: { deskId },
}: {
  params: { deskId: string };
}) {
  const sessionData = await getSessionData();
  if (!sessionData) return notFound();
  const { session, user } = sessionData;
  const desk = await db.query.desk.findFirst({
    where: eq(Desk.id, deskId),
  });
  if (!desk || desk.userId !== user.id) return notFound();
  return (
    <Main>
      <CreateCardForm deskId={desk.id} />
    </Main>
  );
}
