export async function register(name:string, principal:string, credentials:string) {
    try {
        const response = await fetch('/api/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, principal, credentials }),
        });
    
        if (response.status === 401) {
          return {
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