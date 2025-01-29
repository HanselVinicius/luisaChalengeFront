import deleteProduct from "@/app/(auth)/favorites-list/components/actions/deleteProduct";

global.fetch = jest.fn();

describe("deleteProduct", () => {
  const mockProduct = {
    id: 123,
    title: "Produto Teste",
    price: "99.99",
    description: "Descrição do produto teste",
    image: "https://via.placeholder.com/150",
    productId: 123,
    enabled: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve deletar um produto com sucesso", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
    });

    const result = await deleteProduct(mockProduct);
    
    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/v1/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        category: "",
        description: mockProduct.description,
        image: mockProduct.image,
      }),
    });
  });

  it("deve retornar falso se a requisição falhar", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const result = await deleteProduct(mockProduct);
    
    expect(result).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
