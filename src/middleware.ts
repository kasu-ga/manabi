import { TokenType } from "mixejs";
import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { mixe } from "./lib/mixe";

import { SessionCookie } from "./lib/cookies";
import { Languages } from "./lib/consts";

const authRoutes = ["/sign-in", "/sign-up", "/recovery"];
const resetPasswordRoutes = ["/change-password"];

const locales = Object.keys(Languages);
const defaultLocale = "en";

async function getTranslations(reqHeaders: Headers) {
  const headers: Record<string, string> = {};
  reqHeaders.forEach((value, key) => {
    headers[key] = value;
  });
  const languages = new Negotiator({ headers }).languages();
  const userLanguage = match(languages, locales, defaultLocale);
  return userLanguage;
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const cookies = req.cookies;
  const access_token = cookies.get("access_token")?.value;
  const refresh_token = cookies.get("refresh_token")?.value;

  const defaultLanguage = await getTranslations(req.headers);

  if (authRoutes.includes(pathname)) {
    if (refresh_token) return NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("language", defaultLanguage);
    return response;
  }

  if (access_token) {
    const payload = await mixe.tokens.validate(
      access_token,
      TokenType.AccessToken
    );

    if (payload) {
      if (resetPasswordRoutes.includes(pathname)) {
        if (!payload.session.limited)
          return NextResponse.redirect(new URL("/", req.url));

        response.cookies.set("session", await SessionCookie.encode(payload));
        response.cookies.set(
          "language",
          (payload.user as any).language ?? defaultLanguage
        );
        return response;
      }

      if (payload.session.limited)
        return NextResponse.redirect(new URL("/sign-in", req.url));

      response.cookies.set("session", await SessionCookie.encode(payload));
      response.cookies.set(
        "language",
        (payload.user as any).language ?? defaultLanguage
      );
      return response;
    }
  }

  if (refresh_token) {
    const payload = await mixe.tokens.refresh(refresh_token);

    if (payload) {
      response.cookies.set("access_token", payload.access_token);
      response.cookies.set("refresh_token", payload.refresh_token);
      response.cookies.set("session", await SessionCookie.encode(payload));
      response.cookies.set(
        "language",
        (payload.user as any).language ?? defaultLanguage
      );
      return response;
    }
  }

  const redirectRes = NextResponse.redirect(new URL("/sign-in", req.url));

  redirectRes.cookies.delete("access_token");
  redirectRes.cookies.delete("refresh_token");
  redirectRes.cookies.delete("session");

  return redirectRes;
}
