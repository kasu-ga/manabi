import { eq } from "drizzle-orm";

import { db } from "@/db";
import { DeskCard } from "./desk-card";
import { getSessionData } from "@/services/session";
import { Desk } from "@/db/schemas/desk";
import { Title } from "@/components/ui/title";
import { getTranslations } from "@/services/translations";

export async function UserDesks() {
  const translations = await getTranslations();
  const { user } = await getSessionData();
  const desks = await db.query.desk.findMany({
    where: eq(Desk.userId, user.id),
  });
  return (
    <>
      <Title className="mb-6">{translations["user-desks"].title}</Title>
      <section className="relative flex flex-col gap-4">
        {desks.map((desk) => (
          <DeskCard key={desk.id} {...desk} />
        ))}
      </section>
    </>
  );
}
