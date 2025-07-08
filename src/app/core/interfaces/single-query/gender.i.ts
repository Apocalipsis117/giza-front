import { ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP } from "./entity-id.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface Gender_API extends NameIdEntity_API {
    inicial: string;
}

export interface Gender_ListResponse extends ResponseAPI<Gender_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface Gender_APP extends NameIdEntity_APP {
    prefix: string;
}