import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP } from "./entity-id.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface ClassificationMaterials_API extends NameIdEntity_API {
    clasifiacion: string;
}

export interface ClassificationMaterials_ListResponse extends ResponseAPI<ClassificationMaterials_API[]> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface ClassificationMaterials_APP extends NameIdEntity_APP {
    classification: string;
}