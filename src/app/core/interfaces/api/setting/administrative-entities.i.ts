import { PaginateAPI, TypeRegimeAPI } from "@interfaces/index";

export interface AdministrativeEntitiesDTO {
    codigo: number;
    nombre: string;
    nit: string;
    direccion: string;
    direccionRadicacion: string;
    correo: string;
    correoFactuElect: string;
    soat: boolean;
    estado: boolean;
    telefono: string;
    longitudAutorizacion: number;
    numCopias: boolean;
    otrosDatos: string;
    ripsVerificacionNit: boolean;
    requiereAnexo2: boolean;
    resolucion: string;
    regimenId: number;
    departamentoId: number;
    ciudadId: number;
}


export interface AdministrativeEntitiesAPI_PAGE extends PaginateAPI {
    content: AdministrativeEntityAPI[];
}

export interface AdministrativeEntityAPI {
    id: number;
    codigo: number;
    nombre: string;
    nit: string;
    direccion: string;
    direccionRadicacion: string;
    correo: string;
    correoFactuElect: string;
    soat: boolean;
    estado: boolean;
    telefono: string;
    longitudAutorizacion: number;
    numCopias: boolean;
    ripsVerificacionNit: boolean;
    requiereAnexo2: boolean;
    resolucion: string;
    regimen: TypeRegimeAPI;
}



