import { notFound } from "next/navigation";

import { DeskStudy } from "@/components/desks/study";
import { getCardsToStudy } from "@/services/review";
import { Main } from "@/components/ui/main";
import { Title } from "@/components/ui/title";
import { getTranslations } from "@/services/translations";

export default async function Page({
  params: { deskId },
}: {
  params: { deskId: string };
}) {
  const cards = await getCardsToStudy(deskId);
  if (!cards) return notFound();
  const translations = await getTranslations();
  return (
    <Main>
      <Title className="mb-6">{translations.study.review}</Title>
      <DeskStudy
        translations={{
          "show-back": translations.study["show-back"],
          "very-easy": translations.study["very-easy"],
          again: translations.study.again,
          easy: translations.study.easy,
          normal: translations.study.normal,
          hard: translations.study.hard,
          edit: translations.common.edit,
          delete: translations.common.delete,
          empty: translations.study.empty,
        }}
        deskCards={cards}
      />
    </Main>
  );
}
