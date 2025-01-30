/**
 * @jest-environment node
 */
import { POST } from "@/app/api/v1/register/route";
import { ApiService } from "@/lib/service/ApiService";
import { SessionService } from "@/lib/service/SessionService";

import { NextRequest } from "next/server";

jest.mock("@/lib/service/ApiService");
jest.mock("@/lib/service/SessionService");

describe("POST /api/register", () => {
  let mockApiService: jest.Mocked<ApiService>;
  let mockSessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockApiService = new ApiService() as jest.Mocked<ApiService>;
    mockSessionService = new SessionService() as jest.Mocked<SessionService>;

    (ApiService as jest.Mock).mockImplementation(() => mockApiService);
    (SessionService as unknown as jest.Mock).mockImplementation(() => mockSessionService);
  });

  it("deve registrar um usuário e criar a sessão corretamente", async () => {
    const mockApiResponse = {
      status: 200,
      data: {
        token: "mockToken",
        clientName: "John Doe",
        favoriteListId: 123,
        clientId: 456,
      },
    };
    mockApiService.post.mockResolvedValue(mockApiResponse);

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        name: "John Doe",
        principal: "user@example.com",
        credentials: "password123",
      }),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const jsonResponse = await response.json();

    expect(mockApiService.post).toHaveBeenCalledWith("v1/auth/register", {
      name: "John Doe",
      principal: "user@example.com",
      credentials: "password123",
    });

    expect(mockSessionService.createSession).toHaveBeenCalledWith(mockApiResponse.data);

    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual({ status: 200, route: "/home" });
  });

  it("deve retornar erro 401 se o registro falhar", async () => {
    mockApiService.post.mockResolvedValue({
      status: 401,
      error: "User already exists",
      data: "",
    });

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        name: "Existing User",
        principal: "existing@example.com",
        credentials: "password123",
      }),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const jsonResponse = await response.json();

    expect(response.status).toBe(401);
    expect(jsonResponse).toEqual({ error: "User already exists" });

    expect(mockSessionService.createSession).not.toHaveBeenCalled();
  });

  it("deve retornar erro 500 em caso de falha inesperada", async () => {
    mockApiService.post.mockRejectedValue(new Error("Unexpected error"));

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        name: "John Doe",
        principal: "user@example.com",
        credentials: "password123",
      }),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse).toEqual({ error: "Internal server error" });

    expect(mockSessionService.createSession).not.toHaveBeenCalled();
  });
});
