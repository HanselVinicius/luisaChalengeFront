import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionService } from "./lib/service/SessionService";

export async function middleware(req: NextRequest) {
  const sessionService =  new SessionService();
  const session = await sessionService.getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home","/favorites-list"],
};