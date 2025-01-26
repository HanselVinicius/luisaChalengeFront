export async function register(name:string, principal:string, credentials:string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}v1/auth/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, principal, credentials }),
    });
    
    return response.json();
}