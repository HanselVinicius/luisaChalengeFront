import { favorite } from "@/app/(auth)/home/actions/favorite";
import { ResponseDto } from "@/lib/dto/ResponseDto";

global.fetch = jest.fn();

describe("favorite function", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    description: "Test Description",
    price: 100.0,
    image: "https://example.com/image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send a POST request when adding to favorites", async () => {
    const mockResponse: ResponseDto = { success: true, message: "" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await favorite(true, mockProduct);

    expect(fetch).toHaveBeenCalledWith("/api/v1/product", expect.objectContaining({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockProduct),
    }));

    expect(result).toEqual({ success: true, message: "" });
  });

  test("should send a DELETE request when removing from favorites", async () => {
    const mockResponse: ResponseDto = { success: true, message: "" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await favorite(false, mockProduct);

    expect(fetch).toHaveBeenCalledWith("/api/v1/product", expect.objectContaining({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockProduct),
    }));

    expect(result).toEqual({ success: true, message: "" });
  });

  test("should handle API errors gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const result = await favorite(true, mockProduct);

    expect(result).toEqual({
      success: false,
      message: "Erro na requisição. Por favor, tente novamente.",
    });
  });

  test("should handle network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const result = await favorite(true, mockProduct);

    expect(result).toEqual({
      success: false,
      message: "Erro na requisição. Por favor, tente novamente.",
    });
  });
});
