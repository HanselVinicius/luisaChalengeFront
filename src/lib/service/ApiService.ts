export class ApiService {
    private apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  
    private async _request<T>(
      method: "GET" | "POST" | "PUT" | "DELETE",
      endpoint: string,
      body?: object,
      token?: string
    ): Promise<{ status: number; data: T | null; error?: string }> {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
  
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
  
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          return { status: response.status, data: null, error: data.message || "Erro na requisição" };
        }
  
        return { status: response.status, data };
      } catch (error) {
        return { status: 500, data: null, error: "Erro interno no cliente" };
      }
    }
  
    async get<T>(endpoint: string, token?: string) {
      return this._request<T>("GET", endpoint, undefined, token);
    }
  
    async post<T>(endpoint: string, body: object, token?: string) {
      return this._request<T>("POST", endpoint, body, token);
    }
  
    async put<T>(endpoint: string, body: object, token?: string) {
      return this._request<T>("PUT", endpoint, body, token);
    }
  
    async delete<T>(endpoint: string, token?: string) {
      return this._request<T>("DELETE", endpoint, undefined, token);
    }
  }
  