import { NamedEntityAPI } from "./name-entity.i";

export interface TypeVehicleAPI extends NamedEntityAPI {}

export interface TypeDniIPSAPI {
    id: number;
    nombre: string;
    tipo: string;
}

export interface TypeRepresentativeAPI {
    nombre: string;
    codigo_id: number;
}
