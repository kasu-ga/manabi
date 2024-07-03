"use server";

import { SessionCookie } from "@/lib/cookies";
import { SessionData, UserData } from "mixe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface GetSessionData {
  user: UserData & { language: string | null };
  session: SessionData;
}

export type GetSessionDataReturn<T extends boolean> = T extends true
  ? GetSessionData
  : GetSessionData | null;

export async function getSessionData<T extends boolean = true>(
  required: T = true as T
): Promise<GetSessionDataReturn<T>> {
  const rawData = cookies().get("session");
  if (!rawData)
    return (required ? redirect("/sign-in") : null) as GetSessionDataReturn<T>;
  const data = await SessionCookie.decode(rawData.value);
  return data as GetSessionData;
}
