import { ApiService } from "@/lib/service/ApiService";

global.fetch = jest.fn();

describe("ApiService", () => {
    let apiService: ApiService;
    const mockUrl = "https://mockapi.com";
    const mockToken = "test-jwt-token";

    beforeEach(() => {
        process.env.NEXT_PUBLIC_API_URL = mockUrl;
        apiService = new ApiService();
        jest.clearAllMocks();
    });

    test("should make a POST request with correct payload", async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await apiService.post("/test", { key: "value" }, mockToken);

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${mockToken}`,
            },
            body: JSON.stringify({ key: "value" }),
        }));
        expect(result).toEqual({ status: 201, data: mockResponse });
    });

    test("should make a GET request with Authorization header", async () => {
        const mockResponse = { data: "test" };
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await apiService.get("/test", mockToken);

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${mockToken}`,
            },
        }));
        expect(result).toEqual({ status: 200, data: mockResponse });
    });

    test("should make a PUT request", async () => {
        const mockResponse = { updated: true };
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await apiService.put("/test", { key: "value" }, mockToken);

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${mockToken}`,
            },
            body: JSON.stringify({ key: "value" }),
        }));
        expect(result).toEqual({ status: 200, data: mockResponse });
    });

    test("should make a DELETE request", async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 204,
            json: jest.fn().mockResolvedValue(null),
        });

        const result = await apiService.delete("/test", mockToken);

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${mockToken}`,
            },
        }));
        expect(result).toEqual({ status: 204, data: null });
    });

    test("should handle API errors gracefully", async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 400,
            json: jest.fn().mockResolvedValue({ message: "Bad Request" }),
        });

        const result = await apiService.get("/test");

        expect(result).toEqual({ status: 400, data: null });
    });

    test("should handle network errors", async () => {
        fetch.mockRejectedValue(new Error("Network Error"));

        const result = await apiService.get("/test");

        expect(result).toEqual({ status: 500, data: null, error: "Erro interno no cliente" });
    });

    test("should return null if JSON parsing fails", async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
        });

        const result = await apiService.get("/test");

        expect(result).toEqual({ status: 200, data: null });
    });
});
