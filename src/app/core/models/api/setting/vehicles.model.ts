import { VehiclesTDO_APP, VehiclesDTO_API, VehicleAPI, VehicleAPP } from '@interfaces/index';
import { ActivityVehicle } from '../activity-vehicle.model';
import { NamedEntity } from '@models/index';

export class VehicleDTO {
    static setProperty(dataInput: VehiclesTDO_APP): string {
        return new VehicleDTO(dataInput).data;
    }
    constructor(public dataInput: VehiclesTDO_APP) {}

    get data(): string {
        const data: VehiclesDTO_API = {
            actividadId: this.dataInput.activityId,
            descripcion: this.dataInput.description,
            estado: this.dataInput.status,
            marca: this.dataInput.brand,
            modelo: this.dataInput.model,
            placa: this.dataInput.licensePlate,
            tipoVehiculoId: this.dataInput.vehicleTypeId
        }
        return JSON.stringify(data);
    }
}

export class Vehicle {
    static setProperty(dataInput: VehicleAPI): VehicleAPP {
        return new Vehicle(dataInput).data;
    }

    constructor(public dataInput: VehicleAPI) {}

    get data(): VehicleAPP {
        return {
            brand: this.dataInput.marca,
            description: this.dataInput.descripcion,
            id: this.dataInput.id,
            licensePlate: this.dataInput.placa,
            model: this.dataInput.modelo,
            status: this.dataInput.estado,
            activity: ActivityVehicle.setProperty(this.dataInput.actividad),
            vehicleType: NamedEntity.setProperty(this.dataInput.tipoVehiculo)
        };
    }
}