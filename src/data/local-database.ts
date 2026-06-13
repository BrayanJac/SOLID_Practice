export interface IDatabaseProvider {
    getPosts(): Promise<any[]>;
}

export class LocalDatabaseService implements IDatabaseProvider {
    async getPosts(): Promise<any[]> {
        return [
            { id: 1, title: 'Avistamiento de Jaguar', body: 'Se reportó un jaguar cerca del río.' },
            { id: 2, title: 'Nuevas Orquídeas', body: 'Han florecido las especies raras en el jardín botánico.' }
        ];
    }
}

export class JsonDatabaseService implements IDatabaseProvider {
    async getPosts(): Promise<any[]> {
        return [
            { id: 1, title: 'JSON Post 1', body: 'Contenido desde JSON' }
        ];
    }
}

export class ApiDatabaseService implements IDatabaseProvider {
    async getPosts(): Promise<any[]> {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return response.json();
    }
}
