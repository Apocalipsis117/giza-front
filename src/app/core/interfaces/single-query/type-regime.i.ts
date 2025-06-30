import { ResponseAPI } from "@interfaces/extend.i";
/**
 * ---------------------------
 * API
 * ---------------------------
 */

export interface TypeRegime_API {
    id: number;
    inicial: string;
    cuentaRad: string;
    cuentaxRad: string;
    nombre: string;
}

export interface TypeRegime_Response extends ResponseAPI<TypeRegime_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */

export interface TypeRegime_APP {
    id: number; // id
    initial: string; // inicial
    accountRad: string; // cuentaRad
    accountxRad: string; // cuentaxRad
    name: string; // nnombre
}
