import { ResponseAPI } from "@interfaces/extend.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface Gender_API {
    id:      number;
    nombre:  string;
    inicial: string;
}

export interface Gender_ListResponse extends ResponseAPI<Gender_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface Gender_APP {
    id:      number;
    name:  string;
    prefix: string;
}