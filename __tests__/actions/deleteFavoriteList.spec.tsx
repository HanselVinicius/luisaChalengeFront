import { deleteFavoriteList } from "@/app/(auth)/favorites-list/actions/deleteFavoriteList";

global.fetch = jest.fn();

describe("deleteFavoriteList function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send a DELETE request and return JSON response", async () => {
    const mockResponse = { success: true, message: "Lista deletada com sucesso" };
    
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await deleteFavoriteList();

    expect(fetch).toHaveBeenCalledWith("api/v1/favorite-list", expect.objectContaining({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }));

    expect(result).toEqual(mockResponse);
  });

  test("should throw an error if the API response is not OK", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(deleteFavoriteList()).rejects.toThrow("Erro ao deletar a lista de favoritos");

    expect(fetch).toHaveBeenCalledWith("api/v1/favorite-list", expect.objectContaining({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }));
  });

  test("should throw an error if fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    await expect(deleteFavoriteList()).rejects.toThrow("Network Error");

    expect(fetch).toHaveBeenCalledWith("api/v1/favorite-list", expect.objectContaining({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }));
  });
});
