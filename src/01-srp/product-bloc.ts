
interface Product {
    id: number;
    name: string;
}

//  - EmailService: Maneja el envío de notificaciones
export class EmailService {
    send(email: string, message: string): void {
        console.log(`[EmailService] Enviando correo a ${email}: ${message}`);
    }
}

// - ProductRepository: Maneja la persistencia de productos
export class ProductRepository {
    private products: Product[] = [];

    findById(id: number): Product | undefined {
        console.log(`[ProductRepository] Buscando producto con ID: ${id}...`);
        return this.products.find(p => p.id === id);
    }

    save(product: Product): void {
        console.log(`[ProductRepository] Guardando producto ${product.name}...`);
        this.products.push(product);
    }
}

// - ProductBloc: Coordina la lógica de negocio delegando en las dependencias
export class ProductBloc {
    constructor(
        private readonly emailService: EmailService,
        private readonly productRepository: ProductRepository
    ) {}

    loadProduct(id: number): Product | undefined {
        return this.productRepository.findById(id);
    }

    saveProduct(product: Product): void {
        this.productRepository.save(product);
    }

    notifyCustomer(email: string, message: string): void {
        this.emailService.send(email, message);
    }
}
