
export async function login(principal:string, credentials:string) : Promise<{ success: boolean; message?: string; route?: string | null; }> {
  try {
    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ principal, credentials }),
    });
    if (response.status === 401) {
      return {
        success: false,
        message: 'E-mail e/ou senha são inválidos',
      };
    }

    const data = await response.json();
    return {
      success: true,
      route: data.route,
    };
  } catch {
    return {
      success: false,
      message: 'Erro na requisição. Por favor, tente novamente.',
    };
  }

}