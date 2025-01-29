import { register } from "@/app/register/actions/register";

global.fetch = jest.fn();

describe("register function", () => {
  const validName = "John Doe";
  const validPrincipal = "john@example.com";
  const validCredentials = "securepassword123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should register successfully and return success with route and message", async () => {
    const mockResponse = { route: "/dashboard" };

    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await register(validName, validPrincipal, validCredentials);

    expect(fetch).toHaveBeenCalledWith("/api/v1/register", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: validName, principal: validPrincipal, credentials: validCredentials }),
    }));
    expect(result).toEqual({
      success: true,
      route: "/dashboard",
      message: "Usuário cadastrado com sucesso!",
    });
  });

  test("should return error and redirect to /login when response is 401", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({}),
    });

    const result = await register(validName, validPrincipal, validCredentials);

    expect(result).toEqual({
      success: false,
      message: "E-mail e/ou senha são inválidos",
      route: "/login",
    });
  });

  test("should handle network errors gracefully", async () => {
    fetch.mockRejectedValue(new Error("Network error"));

    const result = await register(validName, validPrincipal, validCredentials);

    expect(result).toEqual({
      success: false,
      message: "Erro na requisição. Por favor, tente novamente.",
      route: null,
    });
  });

  test("should register successfully without route when API response does not include it", async () => {
    const mockResponse = {};

    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await register(validName, validPrincipal, validCredentials);

    expect(result).toEqual({
      success: true,
      route: undefined,
      message: "Usuário cadastrado com sucesso!",
    });
  });
});
