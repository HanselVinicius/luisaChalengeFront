import { login } from "@/app/login/actions/auth";

global.fetch = jest.fn();

describe("login function", () => {
  const validPrincipal = "user@example.com";
  const validCredentials = "password123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return success and route on valid login", async () => {
    const mockResponse = { route: "/dashboard" };

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await login(validPrincipal, validCredentials);

    expect(fetch).toHaveBeenCalledWith("/api/v1/login", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ principal: validPrincipal, credentials: validCredentials }),
    }));
    expect(result).toEqual({ success: true, route: "/dashboard" });
  });

  test("should return error message when login is unauthorized (401)", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({}),
    });

    const result = await login(validPrincipal, validCredentials);

    expect(result).toEqual({
      success: false,
      message: "E-mail e/ou senha são inválidos",
    });
  });

  test("should handle network errors gracefully", async () => {
    fetch.mockRejectedValue(new Error("Network error"));

    const result = await login(validPrincipal, validCredentials);

    expect(result).toEqual({
      success: false,
      message: "Erro na requisição. Por favor, tente novamente.",
    });
  });

  test("should return success without route if API response does not include it", async () => {
    const mockResponse = {};

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await login(validPrincipal, validCredentials);

    expect(result).toEqual({ success: true, route: undefined });
  });
});
