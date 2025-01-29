import { SessionService } from "@/lib/service/SessionService";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("SessionService", () => {
  let sessionService: SessionService;
  const mockSessionData = {
    token: "test-token",
    clientName: "Test Client",
    favoriteListId: 123,
    clientId: 456,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionService = new SessionService();
  });

  test("should create a session and set cookie", async () => {
    const mockSet = jest.fn();
    const mockDelete = jest.fn();

    (cookies as jest.Mock).mockReturnValue({
      set: mockSet,
      delete: mockDelete,
    });

    await sessionService.createSession(mockSessionData);

    expect(mockSet).toHaveBeenCalledWith(
      "session",
      JSON.stringify(mockSessionData),
      expect.objectContaining({
        httpOnly: true,
        secure: expect.any(Boolean),
        sameSite: "lax",
        path: "/",
        expires: expect.any(Date),
      })
    );
  });

  test("should retrieve the session data", async () => {
    const mockGet = jest.fn().mockReturnValue({ value: JSON.stringify(mockSessionData) });

    (cookies as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    const session = await sessionService.getSession();
    expect(session).toEqual(JSON.stringify(mockSessionData));
    expect(mockGet).toHaveBeenCalledWith("session");
  });

  test("should return null if session does not exist", async () => {
    const mockGet = jest.fn().mockReturnValue(undefined);

    (cookies as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    const session = await sessionService.getSession();
    expect(session).toBeNull();
  });

  test("should delete the session", async () => {
    const mockDelete = jest.fn();

    (cookies as jest.Mock).mockReturnValue({
      delete: mockDelete,
    });

    await sessionService.deleteSession();
    expect(mockDelete).toHaveBeenCalledWith("session");
  });

  test("should set expiration correctly", async () => {
    const mockSet = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      set: mockSet,
      delete: jest.fn(),
    });

    await sessionService.createSession(mockSessionData, 5);

    expect(mockSet).toHaveBeenCalledWith(
      "session",
      JSON.stringify(mockSessionData),
      expect.objectContaining({
        expires: expect.any(Date),
      })
    );

    const expiresDate = mockSet.mock.calls[0][2].expires as Date;
    const expectedDate = new Date();
    expectedDate.setHours(expectedDate.getHours() + 5);

    expect(expiresDate.getTime()).toBeCloseTo(expectedDate.getTime(), -2);
  });
});
