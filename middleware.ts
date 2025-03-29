import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const theme = req.cookies.get("theme")?.value || "light";

  const response = intlMiddleware(req);

  response.headers.set("x-theme", theme);

  return response;
}

export const config = {
  matcher: ["/", "/(pl|en|ua)/:path*"],
};
