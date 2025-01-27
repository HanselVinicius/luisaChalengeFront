export class ApiService{

    private apiUrl = process.env.NEXT_PUBLIC_API_URL;

    async post(endpoint:string, body:object){
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        return response.json();
    }


    async get(endpoint:string){
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return response.json();
    }


    async put(endpoint:string, body:object){
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        return response.json();
    }


    async delete(endpoint:string){
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return response.json();
    }

}