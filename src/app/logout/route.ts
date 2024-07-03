import { SessionCookie } from "@/lib/cookies";
import { mixe } from "@/lib/mixe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/sign-in", req.url));
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  const cookie = req.cookies.get("session");
  if (cookie) {
    const session = await SessionCookie.decode(cookie.value);
    if (!session || !session.session)
      await mixe.session.invalidate(session.session.id);
  }

  response.cookies.delete("session");
  return response;
}
