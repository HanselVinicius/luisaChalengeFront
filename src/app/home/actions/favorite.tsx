import { ResponseDto } from "@/lib/dto/ResponseDto";

export async function favorite(isFavorite: boolean, product: ProductDto): Promise<ResponseDto> {
    try {
        const response = await fetch('/api/v1/product', {
            method: isFavorite ? 'POST' : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        return await verifyResponse(response);
    } catch (error) {
        console.error("Erro ao enviar requisição:", error);
        return {
            success: false,
            message: "Erro na requisição. Por favor, tente novamente.",
        };
    }
}

async function verifyResponse(response: Response): Promise<ResponseDto> {
    if (!response.ok) {
        return {
            success: false,
            message: "Erro na requisição. Por favor, tente novamente.",
        };
    }

    return {
        success: true,
        message: "",
    };
}
