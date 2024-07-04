import "server-only";

import { SessionCookie } from "@/lib/cookies";
import { SessionData, UserData } from "mixejs";
import { cookies } from "next/headers";

export interface GetSessionData {
  user: UserData & { language: string | null };
  session: SessionData;
}

export async function getSessionData(): Promise<GetSessionData | null> {
  const rawData = cookies().get("session");
  if (!rawData) return null;
  const data = await SessionCookie.decode(rawData.value);
  return data as GetSessionData;
}
