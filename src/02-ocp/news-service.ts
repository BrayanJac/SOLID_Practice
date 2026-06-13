//Abstracción para clientes HTTP
export interface HttpClient {
    get(url: string): Promise<any>;
}

//Implementación concreta usando Fetch API
export class FetchHttpClient implements HttpClient {
    async get(url: string): Promise<any> {
        const response = await fetch(url);
        return response.json();
    }
}

//Implementación concreta simulada para pruebas
export class MockHttpClient implements HttpClient {
    async get(url: string): Promise<any> {
        console.log(`Simulando petición a ${url}`);
        if (url.includes('posts')) {
            return [{ id: 1, title: 'Noticia simulada' }];
        }
        if (url.includes('photos')) {
            return [{ id: 1, url: 'https://example.com/photo.jpg' }];
        }
        return [];
    }
}

export class NewsService {
    constructor(private readonly httpClient: HttpClient) {}

    async getLatestNews() {
        console.log('Obteniendo noticias de la reserva biológica...');
        return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
    }
}

export class PhotosService {
    constructor(private readonly httpClient: HttpClient) {}

    async getGallery() {
        console.log('Obteniendo galería de fotos de la reserva...');
        return this.httpClient.get('https://jsonplaceholder.typicode.com/photos');
    }
}
