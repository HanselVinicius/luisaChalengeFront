/**
 * @jest-environment node
 */
import { GET, POST, PUT, DELETE } from "@/app/api/v1/favorite-list/route";
import { ApiService } from "@/lib/service/ApiService";
import { SessionService } from "@/lib/service/SessionService";
import { NextRequest } from "next/server";

jest.mock("@/lib/service/ApiService");
jest.mock("@/lib/service/SessionService");

describe("API de Lista de Favoritos (GET, POST, PUT, DELETE)", () => {
  let mockApiService: jest.Mocked<ApiService>;
  let mockSessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockApiService = new ApiService() as jest.Mocked<ApiService>;
    mockSessionService = new SessionService() as jest.Mocked<SessionService>;

    (ApiService as jest.Mock).mockImplementation(() => mockApiService);
    (SessionService as unknown as jest.Mock).mockImplementation(() => mockSessionService);
  });

  describe("GET /api/favorite-list", () => {
    it("deve retornar a lista de favoritos corretamente", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      const mockApiResponse = {
        status: 200,
        data: {
          id: 1,
          name: "Meus Favoritos",
          products: [{ id: 101 }, { id: 102 }],
        },
      };

      mockApiService.get.mockResolvedValue(mockApiResponse);

      const response = await GET();
      const jsonResponse = await response.json();

      expect(mockApiService.get).toHaveBeenCalledWith("v1/favorite-list/123", "mockToken");
      expect(response.status).toBe(200);
      expect(jsonResponse).toEqual({
        favoriteList: mockApiResponse.data,
        favorites: undefined,
      });
    });

    it("deve retornar erro caso a API falhe", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      mockApiService.get.mockResolvedValue({ status: 400,data:"", error: "Erro ao obter lista" });

      const response = await GET();
      const jsonResponse = await response.json();

      expect(response.status).toBe(400);
      expect(jsonResponse).toEqual({ error: "Erro ao obter lista" });
    });

    it("deve retornar erro 500 em caso de falha inesperada", async () => {
      mockSessionService.getSession.mockRejectedValue(new Error("Unexpected error"));

      const response = await GET();
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({ error: "Erro interno do servidor" });
    });
  });

  describe("POST /api/favorite-list", () => {
    it("deve criar uma nova lista de favoritos corretamente", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      mockApiService.post.mockResolvedValue({ status: 201,data:"" });

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ name: "Nova Lista", description: "Descrição da lista" }),
      } as unknown as NextRequest;

      const response = await POST(mockRequest);
      const jsonResponse = await response.json();

      expect(mockApiService.post).toHaveBeenCalledWith("v1/favorite-list", { clientId: 123, name: "Nova Lista", description: "Descrição da lista" }, "mockToken");

      expect(response.status).toBe(201);
      expect(jsonResponse).toEqual({ message: "Lista criada com sucesso" });
    });

    it("deve retornar erro se a criação falhar", async () => {
      mockApiService.post.mockResolvedValue({ status: 400,data:"", error: "Erro ao criar lista" });

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ name: "Nova Lista", description: "Descrição da lista" }),
      } as unknown as NextRequest;

      const response = await POST(mockRequest);
      const jsonResponse = await response.json();

      expect(response.status).toBe(400);
      expect(jsonResponse).toEqual({ error: "Erro ao criar lista" });
    });
  });

  describe("PUT /api/favorite-list", () => {
    it("deve editar uma lista de favoritos corretamente", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      mockApiService.put.mockResolvedValue({ status: 201,data:"" });

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ name: "Lista Atualizada", description: "Nova descrição" }),
      } as unknown as NextRequest;

      const response = await PUT(mockRequest);
      const jsonResponse = await response.json();

      expect(mockApiService.put).toHaveBeenCalledWith("v1/favorite-list/123", { name: "Lista Atualizada", description: "Nova descrição" }, "mockToken");

      expect(response.status).toBe(201);
      expect(jsonResponse).toEqual({ message: "lista editada com sucesso" });
    });

    it("deve retornar erro se a edição falhar", async () => {
      mockApiService.put.mockResolvedValue({ status: 400,data:"", error: "Erro ao editar lista" });

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ name: "Lista Atualizada", description: "Nova descrição" }),
      } as unknown as NextRequest;

      const response = await PUT(mockRequest);
      const jsonResponse = await response.json();

      expect(response.status).toBe(400);
      expect(jsonResponse).toEqual({ error: "Erro ao editar lista" });
    });
  });

  describe("DELETE /api/favorite-list", () => {
    it("deve deletar uma lista de favoritos corretamente", async () => {
      mockSessionService.getSession.mockResolvedValue(JSON.stringify({ clientId: 123, token: "mockToken" }));

      mockApiService.delete.mockResolvedValue({ status: 204,data:"" });

      const response = await DELETE();
      const jsonResponse = await response.json();

      expect(mockApiService.delete).toHaveBeenCalledWith("v1/favorite-list/123", "mockToken");

      expect(response.status).toBe(200);
      expect(jsonResponse).toEqual({ message: "lista deletada com sucesso" });
    });

    it("deve retornar erro se a deleção falhar", async () => {
      mockApiService.delete.mockResolvedValue({ status: 400,data:"", error: "Erro ao deletar lista" });

      const response = await DELETE();
      const jsonResponse = await response.json();

      expect(response.status).toBe(400);
      expect(jsonResponse).toEqual({ error: "Erro ao deletar lista" });
    });

    it("deve retornar erro 500 em caso de falha inesperada", async () => {
      mockSessionService.getSession.mockRejectedValue(new Error("Unexpected error"));

      const response = await DELETE();
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({ error: "Erro interno do servidor" });
    });
  });
});
