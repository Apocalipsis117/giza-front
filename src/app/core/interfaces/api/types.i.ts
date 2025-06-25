import { NamedEntityAPI } from "./name-entity.i";

export interface TypeVehicleAPI extends NamedEntityAPI {}

export interface TypeHistoryAPI {
    id: number;
    nombre: string;
    conExt: boolean;
    edadMin: string;
    edadMax: string;
    pSexo: string;
    pyp: boolean;
}

export interface TypeDniIPSAPI {
    id: number;
    nombre: string;
    tipo: string;
}

export interface TypeRepresentativeAPI {
    nombre: string;
    codigo_id: number;
}

export interface TypeRegimeAPI {
    id: number;
    inicial: string;
    cuentaRad: string;
    cuentaxRad: string;
    nnombre: string;
}
