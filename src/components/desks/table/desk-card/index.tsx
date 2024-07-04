import Link from "next/link";
import moment from "moment";

import "moment/locale/es";
import "moment/locale/ja";
import "moment/locale/zh-cn";
import "moment/locale/de";
import "moment/locale/fr";
import "moment/locale/it";
import "moment/locale/ko";
import "moment/locale/nl";
import "moment/locale/pt";
import "moment/locale/ru";

import { SelectDesk } from "@/db/schemas/desk";
import { PencilIcon } from "@/components/icons/pen";
import { DotsVerticalIcon } from "@/components/icons/dots-vertical";
import { TrashIcon } from "@/components/icons/trash";
import { Dropdown } from "@/components/ui/dropdown";
import { DropdownButton } from "@/components/ui/dropdown/button";
import { DropdownMenu } from "@/components/ui/dropdown/menu";
import { PlusIcon } from "@/components/icons/plus";
import { getTranslations } from "@/services/translations";
import { cookies } from "next/headers";

export async function DeskCard(desk: SelectDesk) {
  const language = cookies().get("language")?.value ?? "en";
  const translations = await getTranslations();
  moment.locale(language === "zh" ? "zh-cn" : language);
  return (
    <article className="relative bg-white rounded-3xl border-2 border-zinc-200 p-6 flex justify-between items-center gap-4">
      <header>
        <Link href={`/desks/${desk.id}/study`}>
          <h2 className="text-2xl font-semibold mb-2">{desk.name}</h2>
        </Link>
        {desk.lastReviewDate ? (
          <p className="text-rose-500 text-sm">
            {translations["user-desks"].review}{" "}
            {moment(new Date(desk.lastReviewDate)).fromNow()}
          </p>
        ) : (
          <p className="text-rose-500 text-sm">{translations.common.new}</p>
        )}
      </header>
      <ul className="flex items-center gap-2">
        {/* <li>
          <Link
            className="bg-zinc-100 hover:bg-zinc-200/70 transition-[background-color] rounded-full w-10 aspect-square grid place-items-center"
            href={`/share/${desk.id}`}
          >
            <ShareIcon />
          </Link>
        </li> */}
        <li>
          <Dropdown>
            <DropdownButton className="bg-zinc-100 hover:bg-zinc-200/70 transition-[background-color] rounded-full w-10 aspect-square grid place-items-center">
              <DotsVerticalIcon />
            </DropdownButton>
            <DropdownMenu className="w-32 p-2">
              <Link
                className="flex items-center uppercase gap-1.5 rounded-lg hover:bg-zinc-200/50 transition-[background-color] px-3 py-2 text-sm font-semibold"
                href={`/desks/${desk.id}/edit`}
              >
                <PencilIcon />
                {translations.common.edit}
              </Link>
              <Link
                className="flex items-center uppercase gap-1.5 rounded-lg hover:bg-zinc-200/50 transition-[background-color] px-3 py-2 text-sm font-semibold"
                href={`/desks/${desk.id}/cards/create`}
              >
                <PlusIcon />
                {translations.common.add}
              </Link>
              <Link
                className="flex items-center uppercase gap-1.5 rounded-lg hover:bg-zinc-200/50 transition-[background-color] px-3 py-2 text-sm font-semibold"
                href={`/desks/${desk.id}/delete`}
              >
                <TrashIcon />
                {translations.common.delete}
              </Link>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    </article>
  );
}
