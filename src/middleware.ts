import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utlis";
import { AUTH_ROUTES, LIST_EDIT_PATTERN, PRIVATE_ROUTES } from "./lib/routes";
import { locales } from "./lib/i18n";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  if (pathnameIsMissingLocale) {
    const locale = req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] || "uz";
    const finalLocale = locales.includes(locale as any) ? locale : "uz";
    return NextResponse.redirect(new URL(`/${finalLocale}${pathname}`, req.url));
  }
  const { nextUrl, cookies } = req;

  const { user } = await getServerSideUser(cookies);

  if (user && AUTH_ROUTES.includes(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  if (
    !user &&
    (PRIVATE_ROUTES.includes(nextUrl.pathname) ||
      LIST_EDIT_PATTERN.test(nextUrl.pathname))
  ) {
    return NextResponse.redirect(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/sign-in?origin=${encodeURIComponent(nextUrl.pathname)}`
    );
  }
}
