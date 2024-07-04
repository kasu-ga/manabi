import Link from "next/link";
import { notFound } from "next/navigation";

import { PlusIcon } from "@/components/icons/plus";
import { Dropdown } from "../dropdown";
import { DropdownButton } from "../dropdown/button";
import { NavbarUserAvatar } from "./user-avatar";
import { DropdownMenu } from "../dropdown/menu";
import { SettingsIcon } from "@/components/icons/settings";
import { LogoutIcon } from "@/components/icons/logout";
import { Brand } from "../brand";
import { getTranslations } from "@/services/translations";
import { getSessionData } from "@/services/session";

export async function Navbar() {
  const sessionData = await getSessionData();
  if (!sessionData) return notFound();
  const { user } = sessionData;
  const translations = await getTranslations();
  return (
    <header className="relative bg-white shadow h-20 border-b border-zinc-200 mb-4 z-50">
      <nav className="mx-auto max-w-4xl w-full px-4 flex items-center justify-between h-full">
        <Link href="/">
          <Brand />
        </Link>
        <menu className="flex items-center gap-4">
          <Link
            className="border-2 uppercase border-zinc-200 px-4 h-10 flex items-center gap-1.5 hover:bg-zinc-100/50 transition-[background-color] rounded-full text-sm font-semibold"
            href="/desks/create"
          >
            <PlusIcon />
            {translations.common.new}
          </Link>
          <Dropdown>
            <DropdownButton>
              <NavbarUserAvatar email={"kasuga.fn@outlook.com"} />
            </DropdownButton>
            <DropdownMenu className="w-44 p-2">
              <Link
                className="flex uppercase items-center gap-1.5 rounded-lg hover:bg-zinc-200/50 transition-[background-color] px-3 py-2 text-sm font-semibold"
                href="/settings"
              >
                <SettingsIcon />
                {translations.common.settings}
              </Link>
              <Link
                className="flex uppercase items-center gap-1.5 rounded-lg hover:bg-zinc-200/50 transition-[background-color] px-3 py-2 text-sm font-semibold"
                href="/logout"
              >
                <LogoutIcon />
                {translations.common.logout}
              </Link>
            </DropdownMenu>
          </Dropdown>
        </menu>
      </nav>
    </header>
  );
}
