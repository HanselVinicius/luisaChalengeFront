import { SessionService } from "@/lib/service/SessionService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const sessionService = new SessionService();
    await sessionService.deleteSession();

    const baseUrl = new URL(request.url).origin;

    return NextResponse.redirect(`${baseUrl}/login`);
}