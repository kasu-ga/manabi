import { Languages } from "@/lib/consts";
import { cookies } from "next/headers";

export async function getTranslations() {
  const code = cookies().get("language")?.value ?? "en";
  const language = Languages[code as keyof typeof Languages];
  if (!language) return Languages["en"].translations;
  return language.translations;
}
