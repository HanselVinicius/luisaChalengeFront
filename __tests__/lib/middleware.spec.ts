import { NextResponse } from "next/server";
import { SessionService } from "@/lib/service/SessionService";
import { middleware } from "@/middleware";

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn(),
    next: jest.fn(),
  },
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("Middleware", () => {
  let sessionServiceMock: jest.Mocked<SessionService>;
  let cookiesMock: jest.MockedFunction<any>;

  beforeEach(() => {
    jest.clearAllMocks();
    sessionServiceMock = {
      createSession: jest.fn(),
      getSession: jest.fn(),
      deleteSession: jest.fn(),
    } as jest.Mocked<SessionService>;

    cookiesMock = require("next/headers").cookies;
    cookiesMock.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
      set: jest.fn(),
      delete: jest.fn(),
    });
  });

  test("should allow access if session exists", async () => {
    cookiesMock.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "valid-session" }),
    });

    const req = { url: "https://example.com/home" } as any;
    await middleware(req);

    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  test("should redirect to /login if session does not exist", async () => {
    cookiesMock.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const req = { url: "https://example.com/favorite-list" } as any;
    await middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL("/login", req.url));
    expect(NextResponse.next).not.toHaveBeenCalled();
  });

  test("should handle multiple routes defined in matcher", async () => {
    cookiesMock.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const protectedRoutes = ["/home", "/favorite-list"];
    for (const route of protectedRoutes) {
      const req = { url: `https://example.com${route}` } as any;
      await middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL("/login", req.url));
    }
  });
});
