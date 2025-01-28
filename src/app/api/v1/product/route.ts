import { ApiService } from "@/lib/service/ApiService";
import { SessionService } from "@/lib/service/SessionService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const product = await req.json() as ProductDto;
        const apiService = new ApiService();
        const sessionService = new SessionService();
        const client = JSON.parse(await sessionService.getSession() ?? "");

        const result = await apiService.post<{ token: string, clientName: string, favoriteListId: number, clientId: number }>(`v1/product`, {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            image: product.image,
            clientId: client.clientId
        },client.token);
        if (result.status === 400) {
            return NextResponse.json({ error: 'Usuário não possui uma lista de favoritos' }, { status: 401 });
        }

        return NextResponse.json({ status: 200});
    } catch (error) {
        console.error('Request failed error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const product = await req.json() as ProductDto;
        const apiService = new ApiService();
        const sessionService = new SessionService();
        const client = JSON.parse(await sessionService.getSession() ?? "");

        const result = await apiService.delete(
            `v1/product/${client.clientId}/${product.id}`,
            client.token
        );

        if (result.status === 400) {
            return NextResponse.json({ error: "Usuário não possui essa lista de favoritos" }, { status: 401 });
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error("Request failed error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
