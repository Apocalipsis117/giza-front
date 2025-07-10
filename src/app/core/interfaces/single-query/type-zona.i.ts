import { ResponseAPI } from "@interfaces/extend.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface TypeZona_API {
    id:     number;
    nombre: string;
    sigla:  string;
}

export interface TypeZona_ListResponse extends ResponseAPI<TypeZona_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface TypeZona_APP {
    id:       number;
    name:     string;
    initials: string;
}