import { ServicesAPI, ServicesAPP } from "@interfaces/index";

export class Services {
    static setProperty(dataInput: ServicesAPI): ServicesAPP {
        return new Services(dataInput).data;
    }

    constructor(public dataInput: ServicesAPI) {}

    get data(): ServicesAPP {
        return {
            id: this.dataInput.id,
            name: this.dataInput.nombre,
            status: this.dataInput.estado,
            operatingRoom: this.dataInput.quirofano,
            serviceOrder: this.dataInput.ordenServicio,
            order: this.dataInput.orden,
            orderImplementation: this.dataInput.ordenImpl
        };
    }
}
