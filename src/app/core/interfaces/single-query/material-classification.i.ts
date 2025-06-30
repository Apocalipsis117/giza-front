/**
 * ---------------------------
 * API
 * ---------------------------
 */

import { ResponseAPI } from "@interfaces/extend.i";

export interface MaterialClassification_API {
    id:           number;
    nombre:       string;
    clasifiacion: string;
}

export interface MaterialClassification_ListResponse extends ResponseAPI<MaterialClassification_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */

export interface MaterialClassification_APP {
    id: number; // id
    name: string; // nombre
    classification: string; // clasifiacion
}