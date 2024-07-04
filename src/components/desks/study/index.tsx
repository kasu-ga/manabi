"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { SelectCard } from "@/db/schemas/card";
import { processCardReview } from "@/services/process-review";
import { PencilIcon } from "@/components/icons/pen";
import { TrashIcon } from "@/components/icons/trash";
import { Dropdown } from "@/components/ui/dropdown";
import { DropdownButton } from "@/components/ui/dropdown/button";
import { DotsVerticalIcon } from "@/components/icons/dots-vertical";
import { DropdownMenu } from "@/components/ui/dropdown/menu";
import { AudioPlayer } from "@/components/ui/audio-player";

export interface StudyCard {
  text?: string | null;
  reading?: string | null;
  image?: string | null;
  audio?: string | null;
}

export function DeskStudy({
  translations,
  deskCards,
}: {
  deskCards: Array<SelectCard>;
  translations: {
    "show-back": string;
    again: string;
    hard: string;
    normal: string;
    easy: string;
    "very-easy": string;
    edit: string;
    delete: string;
    empty: string;
  };
}) {
  const [cards, setCards] = useState(deskCards);
  const [position, setPosition] = useState<"front" | "back">("front");
  const [card, setCard] = useState(deskCards[0]);

  const showBack = useCallback(() => {
    setPosition("back");
  }, []);

  useEffect(() => {
    if (!cards.length) return;
    const newCard = cards[0];
    setCard(newCard);
  }, [cards]);

  const data = useMemo(() => {
    if (!card) return null;
    return {
      text: card[position === "front" ? "frontText" : "backText"],
      reading: card[position === "front" ? "frontReading" : "backReading"],
      image: card[position === "front" ? "frontImage" : "backImage"],
      audio: card[position === "front" ? "frontAudio" : "backAudio"],
    };
  }, [card, position]);

  const submitReviewRating = async (rating: number) => {
    await processCardReview(card?.id, rating);
    if (cards.length === 1) return window.location.reload();
    setCards(cards.slice(1));
    setPosition("front");
  };

  return (
    <>
      {data ? (
        <>
          <article className="relative bg-white border-2 border-zinc-200 rounded-xl px-6 py-14 min-h-[28rem] flex flex-col items-center justify-center mb-8">
            <div className="absolute right-6 top-6">
              <Dropdown>
                <DropdownButton className="bg-zinc-100 hover:bg-zinc-200/70 transition-[background-color] rounded-full w-10 aspect-square grid place-items-center">
                  <DotsVerticalIcon />
                </DropdownButton>
                <DropdownMenu className="w-32 p-2">
                  <Link
                    className="flex items-center uppercase gap-1.5 rounded-lg hover:bg-zinc-200/50 transition-[background-color] px-3 py-2 text-sm font-semibold"
                    href={`/desks/${card.deskId}/cards/${card.id}/edit`}
                  >
                    <PencilIcon />
                    {translations.edit}
                  </Link>
                  <Link
                    className="flex items-center uppercase gap-1.5 rounded-lg hover:bg-zinc-200/50 transition-[background-color] px-3 py-2 text-sm font-semibold"
                    href={`/desks/${card.deskId}/cards/${card.id}/delete`}
                  >
                    <TrashIcon />
                    {translations.delete}
                  </Link>
                </DropdownMenu>
              </Dropdown>
            </div>

            {data.image ? (
              <div className="relative w-48 aspect-square mb-8 rounded-xl overflow-hidden">
                <Image
                  src={`/assets/${data.image}`}
                  fill
                  className="object-cover w-full h-full"
                  alt="Front Image"
                />
              </div>
            ) : null}
            {data.text ? (
              <h3 className="text-4xl font-semibold mb-4">{data.text}</h3>
            ) : null}
            {data.text ? (
              <p className="text-xl text-zinc-500">{data.reading}</p>
            ) : null}
            {data.audio ? <AudioPlayer src={data.audio} /> : null}
          </article>
          <div className="mx-auto grid place-items-center">
            {position === "front" ? (
              <button
                className="bg-rose-500 text-white uppercase rounded-xl h-10 px-6 relative text-nowrap transition-[background-color] hover:bg-rose-600"
                onClick={showBack}
              >
                {translations["show-back"]}
              </button>
            ) : (
              <menu className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  className="relative rounded-xl transition-[background] text-white bg-red-500 hover:bg-red-600 px-4 h-10 text-nowrap"
                  onClick={() => submitReviewRating(1)}
                >
                  {translations.again}
                </button>
                <button
                  className="relative rounded-xl transition-[background] text-white bg-orange-500 hover:bg-orange-600 px-4 h-10 text-nowrap"
                  onClick={() => submitReviewRating(2)}
                >
                  {translations.hard}
                </button>
                <button
                  className="relative rounded-xl transition-[background] text-white bg-yellow-500 hover:bg-yellow-600 px-4 h-10 text-nowrap"
                  onClick={() => submitReviewRating(3)}
                >
                  {translations.normal}
                </button>
                <button
                  className="relative rounded-xl transition-[background] text-white bg-blue-500 hover:bg-blue-600 px-4 h-10 text-nowrap"
                  onClick={() => submitReviewRating(4)}
                >
                  {translations.easy}
                </button>
                <button
                  className="relative rounded-xl transition-[background] text-white bg-lime-500 hover:bg-lime-600 px-4 h-10 text-nowrap"
                  onClick={() => submitReviewRating(5)}
                >
                  {translations["very-easy"]}
                </button>
              </menu>
            )}
          </div>
        </>
      ) : (
        <p>{translations.empty}</p>
      )}
    </>
  );
}
