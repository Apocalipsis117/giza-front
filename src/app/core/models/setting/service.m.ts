import { Service_API, Service_APP, Service_APPDTO, Service_DTO } from "@interfaces/index";

export class ServiceDTO {
    static setProperty(input: Service_APPDTO) {
        return new ServiceDTO(input).data;
    }
    constructor(public input: Service_APPDTO) {}

    get data() {
        const data: Service_DTO = {
            estado: this.input.status,
            nombre: this.input.name,
            orden: this.input.order,
            ordenImpl: this.input.orderImpl,
            ordenServicio: this.input.serviceOrder,
            quirofano: this.input.operatingRoom
        }
        return JSON.stringify(data);
    }
}

export class Service {
    static setProperty(input: Service_API) {
        return new Service(input).data;
    }
    constructor(public input: Service_API) {}

    get data(): Service_APP {
        return {
            id: this.input.id,
            name: this.input.nombre,
            operatingRoom: this.input.quirofano,
            order: this.input.orden,
            orderImpl: this.input.ordenImpl,
            serviceOrder: this.input.ordenServicio,
            status: this.input.estado
        };
    }
}