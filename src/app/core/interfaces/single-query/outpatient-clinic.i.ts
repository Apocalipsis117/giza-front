import { ResponseAPI } from "@interfaces/extend.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface OutpatientClinic_API {
    id: number;
    codigo: number;
    nombre: string;
}

export interface OutpatientClinic_ListResponse extends ResponseAPI<OutpatientClinic_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */

export interface OutpatientClinic_APP {
    id: number;
    code: number;
    name: string;
}
