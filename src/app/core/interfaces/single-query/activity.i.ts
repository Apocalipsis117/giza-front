/**
 * ---------------------------
 * API
 * ---------------------------
 */

import { PageAPI, ResponseAPI } from "@interfaces/extend.i";

export interface Activity_API {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Activity_ListResponse extends ResponseAPI<Activity_API[]> {}
export interface Activity_Response extends ResponseAPI<Activity_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface Activity_APP {
    id: number;
    name: string;
    description: string;
}

export interface Activity_PageAPP extends PageAPI<Activity_APP> {}