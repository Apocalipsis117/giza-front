import { ResponseAPI } from "@interfaces/extend.i";

// departamento y municipio

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface Apartment_API {
    id: number;
    codigo: string;
    nombre: string;
}

export interface Apartment_ListResponse extends ResponseAPI<Apartment_API[]> {}

export interface Municipality_API {
    id:                 number;
    codigoDepartamento: string;
    codigo:             string;
    nombre:             string;
    codigoCompleto:     string;
    departamento:       Apartment_API;
}

export interface Municipality_ListResponse extends ResponseAPI<Municipality_API[]> {}


/**
 * ---------------------------
 * APP
 * ---------------------------
 */

export interface Apartment_APP {
    id: number;          // id
    name: string;        // nombre
}

export interface Municipality_APP {
    id: number;                          // id
    name: string;                        // nombre
    department: Apartment_APP | null;           // departamento
}