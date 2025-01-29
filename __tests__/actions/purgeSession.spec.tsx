import purgeSession from "@/components/navbar/actions/purgeSession";

global.fetch = jest.fn();

describe("purgeSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve redirecionar para a URL da resposta se for redirecionado", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      redirected: true,
      url: "/dashboard",
    });

    delete (global as any).window.location;
    global.window.location = { href: "" };

    await purgeSession();

    expect(global.window.location.href).toBe("/dashboard");
  });

  it("deve redirecionar para /login se não for redirecionado pela API", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      redirected: false,
    });

    delete (global as any).window.location;
    global.window.location = { href: "" };

    await purgeSession();

    expect(global.window.location.href).toBe("/login");
  });

  it("não deve redirecionar se a requisição falhar", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    delete (global as any).window.location;
    global.window.location = { href: "" };

    await purgeSession();

    expect(global.window.location.href).toBe("");
  });
});
