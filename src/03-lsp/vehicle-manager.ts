//Interfaz base que define el contrato común para todos los vehículos
export interface Vehicle {
    getModel(): string;
    getSpecialFeature(): string;
}

//Implementaciones concretas que respetan el contrato Vehicle
export class Tesla implements Vehicle {
    constructor(private readonly model: string) {}

    getModel(): string {
        return this.model;
    }

    getSpecialFeature(): string {
        return 'Carga eléctrica al 100%';
    }
}

export class Audi implements Vehicle {
    constructor(private readonly model: string) {}

    getModel(): string {
        return this.model;
    }

    getSpecialFeature(): string {
        return 'Tracción Quattro activada';
    }
}

export class Toyota implements Vehicle {
    constructor(private readonly model: string) {}

    getModel(): string {
        return this.model;
    }

    getSpecialFeature(): string {
        return 'Motor híbrido listo';
    }
}

export class Honda implements Vehicle {
    constructor(private readonly model: string) {}

    getModel(): string {
        return this.model;
    }

    getSpecialFeature(): string {
        return 'VTEC activado';
    }
}

export class Ford implements Vehicle {
    constructor(private readonly model: string) {}

    getModel(): string {
        return this.model;
    }

    getSpecialFeature(): string {
        return 'Built Tough';
    }
}

export class Volvo implements Vehicle {
    constructor(private readonly model: string) {}

    getModel(): string {
        return this.model;
    }

    getSpecialFeature(): string {
        return 'Seguridad City Safety activada';
    }
}

export class VehicleManager {
    //Ahora acepta cualquier Vehicle, no necesita conocer tipos específicos.
    static printVehicleDetails(vehicles: Vehicle[]): void {
        vehicles.forEach(vehicle => {
            console.log(`${vehicle.getModel()}: ${vehicle.getSpecialFeature()}`);
        });
    }
}
