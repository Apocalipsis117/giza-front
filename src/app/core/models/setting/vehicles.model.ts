import { Vehicle_API, Vehicle_APP, Vehicle_APPDTO, Vehicle_DTO } from "@interfaces/index";
import { Activity } from "@models/index";
import { NameIdEntity } from "../single-query/name-entity.m";

export class VehicleDTO {
    static setProperty(input: Vehicle_APPDTO) {
        return new VehicleDTO(input).data;
    }
    constructor(public input: Vehicle_APPDTO) {}

    get data() {
        const data: Vehicle_DTO = {
            actividadId: this.input.activityId,
            descripcion: this.input.description,
            estado: this.input.status,
            marca: this.input.brand,
            modelo: this.input.model,
            placa: this.input.plate,
            tipoVehiculoId: this.input.vehicleTypeId

        }
        return JSON.stringify(data);
    }
}

export class Vehicle {
    static setProperty(input: Vehicle_API) {
        return new Vehicle(input).data;
    }
    constructor(public input: Vehicle_API) {}

    get data(): Vehicle_APP {
        return {
            uuid: this.input.uuid,
            activity: Activity.setProperty(this.input.actividad),
            brand: this.input.marca,
            description: this.input.descripcion,
            model: this.input.modelo,
            plate: this.input.placa,
            status: this.input.estado,
            vehicleType: NameIdEntity.setProperty(this.input.tipoVehiculo)
        };
    }
}