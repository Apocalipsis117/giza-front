import { Apartment_API, Apartment_APP, Municipality_API, Municipality_APP } from '@interfaces/index';

export class Apartment {
    static setProperty(data: Apartment_API) {
        return new Apartment(data).model;
    }
    constructor(public data: Apartment_API) {}

    get model(): Apartment_APP {
        return {
            id: this.data.id,
            name: this.data.nombre
        }
    }
}


export class Municipaly {
    static setProperty(data: Municipality_API) {
        return new Apartment(data).model;
    }
    constructor(public data: Municipality_API) {}

    get model(): Municipality_APP {
        return {
            department: Apartment.setProperty(this.data.departamento),
            id: this.data.id,
            name: this.data.nombre
        }
    }
}