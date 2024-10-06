import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/constants";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  let locale;

  const language = cookies().get("language")?.value;

  if (language) {
    locale = language;
  } else {
    const headers = {
      "accept-language": request.headers.get("accept-language") || "",
    };
    const locales = LOCALES;
    const defaultLocale = DEFAULT_LOCALE;
    const languages = new Negotiator({ headers }).languages();

    locale = match(languages, locales, defaultLocale);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
