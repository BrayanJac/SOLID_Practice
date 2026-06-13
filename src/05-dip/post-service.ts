import { IDatabaseProvider } from '../data/local-database';

export class PostService {
    private posts: any[] = [];

    constructor(private readonly databaseProvider: IDatabaseProvider) {}

    async getPosts() {
        /**
         * PostService depende de la abstracción IDatabaseProvider.
         * Podemos inyectar LocalDatabaseService, JsonDatabaseService, ApiDatabaseService
         * o cualquier otra implementación sin modificar este código.
         */
        this.posts = await this.databaseProvider.getPosts();
        return this.posts;
    }
}
