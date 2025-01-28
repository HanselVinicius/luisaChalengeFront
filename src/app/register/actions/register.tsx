export async function register(name:string, principal:string, credentials:string) : Promise<{ success: boolean; message?: string; route?: string | null; }> {
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
            success: false,
            message: 'E-mail e/ou senha são inválidos',
            route: '/login',
          };
        }
    
        const data = await response.json();
        return {
          success: true,
          route: data.route,
          message: 'Usuário cadastrado com sucesso!',
        };
      } catch {
        return {
          success: false,
          message: 'Erro na requisição. Por favor, tente novamente.',
          route: null,
        };
      }
}