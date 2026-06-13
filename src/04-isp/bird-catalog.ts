// Interfaz base para todas las aves
export interface IBird {
    eat(): void;
}

// Interfaz para aves que pueden volar
export interface IFlyingBird extends IBird {
    fly(): void;
}

// Interfaz para aves que pueden nadar
export interface ISwimmingBird extends IBird {
    swim(): void;
}

// El Tucán puede volar pero no suele nadar
export class Toucan implements IFlyingBird {
    eat(): void {
        console.log('El Tucán está comiendo frutas.');
    }

    fly(): void {
        console.log('El Tucán vuela sobre la selva.');
    }
}

// El Colibrí vuela pero no nada
export class Hummingbird implements IFlyingBird {
    eat(): void {
        console.log('El Colibrí busca néctar.');
    }

    fly(): void {
        console.log('El Colibrí aletea rápidamente.');
    }
}

// El Avestruz no vuela pero puede nadar
export class Ostrich implements ISwimmingBird {
    eat(): void {
        console.log('El Avestruz come hierbas.');
    }

    swim(): void {
        console.log('El Avestruz puede nadar si es necesario.');
    }
}

// El Pinguino no vuela pero nada muy bien
export class Penguin implements ISwimmingBird {
    eat(): void {
        console.log('El Pingüino busca peces.');
    }

    swim(): void {
        console.log('El Pingüino nada ágilmente en el agua.');
    }
}

// El Pato puede volar y nadar
export class Duck implements IFlyingBird, ISwimmingBird {
    eat(): void {
        console.log('El Pato come plantas y pequeños insectos.');
    }

    fly(): void {
        console.log('El Pato vuela en formación.');
    }

    swim(): void {
        console.log('El Pato nada en el estanque.');
    }
}
