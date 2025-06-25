import { ActivityVehicleAPI, TypeVehicleAPI } from "@interfaces/index";

/**
 * vehicle
 * @method: post
 */
export interface VehiclesDTO_API {
    marca: string;
    modelo: string;
    placa: string;
    descripcion: string;
    estado: boolean;
    actividadId: number;
    tipoVehiculoId: number;
}

/**
 * vehicles
 * @method get
 */
export interface VehicleAPI {
    id:           number;
    marca:        string;
    modelo:       string;
    placa:        string;
    descripcion:  string;
    estado:       boolean;
    actividad:    ActivityVehicleAPI;
    tipoVehiculo: TypeVehicleAPI;
}
