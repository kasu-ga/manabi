import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { Desk } from "@/db/schemas/desk";

import { EditDeskForm } from "@/components/desks/edit";
import { getSessionData } from "@/services/session";
import { Main } from "@/components/ui/main";

export default async function Page({
  params: { deskId },
}: {
  params: { deskId: string };
}) {
  const sessionData = await getSessionData();
  if (!sessionData) return notFound();
  const { user } = sessionData;
  const desk = await db.query.desk.findFirst({
    where: eq(Desk.id, deskId),
  });
  if (!desk || desk.userId !== user.id) return notFound();
  return (
    <Main>
      <EditDeskForm data={desk} />
    </Main>
  );
}
