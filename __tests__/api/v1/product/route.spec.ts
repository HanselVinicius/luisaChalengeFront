/**
 * @jest-environment node
 */
import { POST, DELETE } from "@/app/api/v1/product/route";
import { ApiService } from "@/lib/service/ApiService";
import { SessionService } from "@/lib/service/SessionService";
import { NextRequest } from "next/server";

jest.mock("@/lib/service/ApiService");
jest.mock("@/lib/service/SessionService");

describe("API de Produto (POST & DELETE)", () => {
  let mockApiService: jest.Mocked<ApiService>;
  let mockSessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockApiService = new ApiService() as jest.Mocked<ApiService>;
    mockSessionService = new SessionService() as jest.Mocked<SessionService>;

    (ApiService as jest.Mock).mockImplementation(() => mockApiService);
    (SessionService as unknown as jest.Mock).mockImplementation(() => mockSessionService);
  });

  describe("POST /api/product", () => {
    it("deve adicionar um produto corretamente", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      const mockApiResponse = { status: 200,data:"" };
      mockApiService.post.mockResolvedValue(mockApiResponse);

      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          id: 1,
          title: "Produto Teste",
          price: 100,
          description: "Descrição do produto",
          image: "url_da_imagem",
        }),
      } as unknown as NextRequest;

      const response = await POST(mockRequest);
      const jsonResponse = await response.json();

      expect(mockApiService.post).toHaveBeenCalledWith("v1/product", {
        id: 1,
        title: "Produto Teste",
        price: 100,
        description: "Descrição do produto",
        image: "url_da_imagem",
        clientId: 123,
      }, "mockToken");

      expect(response.status).toBe(200);
      expect(jsonResponse).toEqual({ status: 200 });
    });

    it("deve retornar erro 401 se o usuário não tiver uma lista de favoritos", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      mockApiService.post.mockResolvedValue({ status: 400,data:"" });

      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          id: 1,
          title: "Produto Teste",
          price: 100,
          description: "Descrição do produto",
          image: "url_da_imagem",
        }),
      } as unknown as NextRequest;

      const response = await POST(mockRequest);
      const jsonResponse = await response.json();

      expect(response.status).toBe(401);
      expect(jsonResponse).toEqual({ error: "Usuário não possui uma lista de favoritos" });
    });

    it("deve retornar erro 500 em caso de falha inesperada", async () => {
      mockSessionService.getSession.mockRejectedValue(new Error("Unexpected error"));

      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          id: 1,
          title: "Produto Teste",
          price: 100,
          description: "Descrição do produto",
          image: "url_da_imagem",
        }),
      } as unknown as NextRequest;

      const response = await POST(mockRequest);
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({ error: "Internal server error" });
    });
  });

  describe("DELETE /api/product", () => {
    it("deve deletar um produto corretamente", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      mockApiService.delete.mockResolvedValue({ status: 200,data:"" });

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ id: 1 }),
      } as unknown as NextRequest;

      const response = await DELETE(mockRequest);
      const jsonResponse = await response.json();

      expect(mockApiService.delete).toHaveBeenCalledWith("v1/product/123/1", "mockToken");

      expect(response.status).toBe(200);
      expect(jsonResponse).toEqual({ status: 200 });
    });

    it("deve retornar erro 401 se o usuário não possuir essa lista de favoritos", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      mockApiService.delete.mockResolvedValue({ status: 400,data:"" });

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ id: 1 }),
      } as unknown as NextRequest;

      const response = await DELETE(mockRequest);
      const jsonResponse = await response.json();

      expect(response.status).toBe(401);
      expect(jsonResponse).toEqual({ error: "Usuário não possui essa lista de favoritos" });
    });

    it("deve retornar erro 500 em caso de falha inesperada", async () => {
      mockSessionService.getSession.mockRejectedValue(new Error("Unexpected error"));

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ id: 1 }),
      } as unknown as NextRequest;

      const response = await DELETE(mockRequest);
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({ error: "Internal server error" });
    });
  });
});
