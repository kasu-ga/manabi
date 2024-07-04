import { eq } from "drizzle-orm";

import { UserDesks } from "@/components/desks/table";
import { Main } from "@/components/ui/main";
import { Title } from "@/components/ui/title";
import { db } from "@/db";
import { Desk } from "@/db/schemas/desk";
import { getSessionData } from "@/services/session";
import { getTranslations } from "@/services/translations";
import { notFound } from "next/navigation";

export default async function Home() {
  const translations = await getTranslations();
  const sessionData = await getSessionData();
  if (!sessionData) return notFound();
  const desks = await db.query.desk.findMany({
    where: eq(Desk.userId, sessionData.user.id),
  });
  return (
    <Main>
      <Title className="mb-6">{translations["user-desks"].title}</Title>
      <UserDesks desks={desks} />
    </Main>
  );
}
