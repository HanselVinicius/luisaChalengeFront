import { cookies } from "next/headers";

export class SessionService {
  private static SESSION_KEY = "session";
  private static DEFAULT_EXPIRATION_HOURS = 3;

  public async createSession(
    data: {token:string,clientName:string,favoriteListId:number,clientId:number},
    expirationHours: number = SessionService.DEFAULT_EXPIRATION_HOURS
  ) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationHours);
    (await cookies()).set(SessionService.SESSION_KEY, JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  }

  public async getSession(): Promise<string | null> {
    return (await cookies()).get(SessionService.SESSION_KEY)?.value || null;
  }

  public async deleteSession() {
    (await cookies()).delete(SessionService.SESSION_KEY);
  }
}
