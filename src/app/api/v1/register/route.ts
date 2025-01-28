import { ApiService } from "@/lib/service/ApiService";
import { SessionService } from "@/lib/service/SessionService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const { name, principal, credentials } = await req.json();
        const apiService = new ApiService(); 
        const result = await apiService.post<{token:string,clientName:string,favoriteListId:number,clientId:number}>(`v1/auth/register`,{name,principal,credentials});

      if (result.status !== 200) {
        return NextResponse.json({ error: result.error }, { status: 401 });
      }
      const sessionService = new SessionService();
      await sessionService.createSession(result.data!!);
      return NextResponse.json({ status: 200, route: '/home' });
    } catch (error) {
      console.error('Request failed error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }