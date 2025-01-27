import { ApiService } from "../src/lib/service/ApiService";

global.fetch = jest.fn();

describe("ApiService", () => {
    let apiService;
    const mockUrl = "https://mockapi.com";

    beforeEach(() => {
        process.env.NEXT_PUBLIC_API_URL = mockUrl;
        apiService = new ApiService();
        fetch.mockClear();
    });

    test("should make a POST request", async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await apiService.post("/test", { key: "value" });

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: "value" }),
        }));
        expect(result).toEqual(mockResponse);
    });

    test("should make a GET request", async () => {
        const mockResponse = { data: "test" };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await apiService.get("/test");

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }));
        expect(result).toEqual(mockResponse);
    });

    test("should make a PUT request", async () => {
        const mockResponse = { updated: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await apiService.put("/test", { key: "value" });

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: "value" }),
        }));
        expect(result).toEqual(mockResponse);
    });

    test("should make a DELETE request", async () => {
        const mockResponse = { deleted: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await apiService.delete("/test");

        expect(fetch).toHaveBeenCalledWith(`${mockUrl}/test`, expect.objectContaining({
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }));
        expect(result).toEqual(mockResponse);
    });
});