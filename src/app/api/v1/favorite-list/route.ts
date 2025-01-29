import { FavoriteList } from "@/app/domain/FavoriteList";
import { ApiService } from "@/lib/service/ApiService";
import { SessionService } from "@/lib/service/SessionService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const apiService = new ApiService();
    const sessionService = new SessionService();
    
    const clientSession = JSON.parse(await sessionService.getSession() ?? "{}");

    const clientId = clientSession.clientId;
    const token = clientSession.token;

    const result = await apiService.get<FavoriteList >(
      `v1/favorite-list/${clientId}`,
      token
    );
    if (result.status !== 200) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    const favoriteProductIds = result.data!!.products.forEach((product) => product.id);

    return NextResponse.json({ favoriteList:result.data ,favorites: favoriteProductIds }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar lista de favoritos:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();
    const apiService = new ApiService();
    const sessionService = new SessionService();

    const clientSession = JSON.parse(await sessionService.getSession() ?? "{}");

    const clientId = clientSession.clientId;
    const token = clientSession.token;

    const result = await apiService.post(
      `v1/favorite-list`,
      { clientId, name, description },
      token
    );
    if (result.status !== 201) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ message: "Lista criada com sucesso" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar lista de favoritos:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}



