/**
 * @jest-environment node
 */
import { GET } from "@/app/api/v1/logout/route";
import { SessionService } from "@/lib/service/SessionService";

jest.mock("@/lib/service/SessionService");

describe("GET /api/logout", () => {
  let mockSessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSessionService = new SessionService() as jest.Mocked<SessionService>;
    (SessionService as unknown as jest.Mock).mockImplementation(() => mockSessionService);
  });

  it("deve deletar a sessão e redirecionar para /login", async () => {
    mockSessionService.deleteSession.mockResolvedValue();

    const mockRequest = new Request("https://example.com/api/logout");

    const response = await GET(mockRequest);

    expect(mockSessionService.deleteSession).toHaveBeenCalled();

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://example.com/login");
  });


});
