import { ApiService } from "@/lib/service/ApiService";
import { SessionService } from "@/lib/service/SessionService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const { principal, credentials } = await req.json();
        const apiService = new ApiService(); 
        const result = await apiService.post(`v1/auth/authenticate`,{principal,credentials});

      if ('error' in result) {
        return NextResponse.json({ error: result.error }, { status: 401 });
      }
      const sessionService = new SessionService();
      sessionService.createSession(result.token);
      
      return NextResponse.json({ status: 200, route: result.rota });
    } catch (error) {
      console.error('Request failed error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }