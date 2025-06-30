import { ResponseAPI } from "@interfaces/extend.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface TypeHistory_API {
    id:      number;
    nombre:  string;
    conExt:  boolean;
    edadMin: string;
    edadMax: string;
    pyp:     boolean;
    psexo:   string;
}

export interface TypeHistory_ListResponse extends ResponseAPI<TypeHistory_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface TypeHistory_APP {
    id: number; // id
    name: string; // nombre
    withExtension: boolean; // conExt
    minAge: string; // edadMin
    maxAge: string; // edadMax
    pyp: boolean; // pyp
    allowedSex: string; // psexo
}