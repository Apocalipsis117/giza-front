import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Activity_API, Activity_APP, NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */

interface Base_API {
    marca:          string;
    modelo:         string;
    placa:          string;
    descripcion:    string;
    estado:         boolean;
}

export interface Vehicle_DTO extends Base_API {
    actividadId:    number;
    tipoVehiculoId: number;
}

export interface Vehicle_API extends Base_API {
    uuid:           string;
    actividad:    Activity_API;
    tipoVehiculo: NameIdEntity_API;
}

export interface Vehicle_PageResponse extends ResponseAPI<PageAPI<Vehicle_API>> {}
export interface Vehicle_PageAPI extends PageAPI<Vehicle_API> {}
export interface Vehicle_ListResponse extends ResponseAPI<Vehicle_API[]> {}
export interface Vehicle_Response extends ResponseAPI<Vehicle_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    brand: string;          // marca
    model: string;          // modelo
    plate: string;          // placa
    description: string;    // descripcion
    status: boolean;        // estado
}

export interface Vehicle_APPDTO extends Base_APP {
    activityId: number;         // actividadId
    vehicleTypeId: number;      // tipoVehiculoId
}

export interface Vehicle_APP extends Base_APP {
    uuid: string;                     // id
    activity: Activity_APP;         // actividad
    vehicleType: NameIdEntity_APP;  // tipoVehiculo
}

export interface Vehicle_PageAPP extends PageAPI<Vehicle_APP> {}