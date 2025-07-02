import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameStateEntity_API, NameStateEntity_APP } from "@interfaces/index";
import { MaterialClassification_API, MaterialClassification_APP } from "@interfaces/single-query/material-classification.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface InputMaterials_DTO {
    nombre:                       string;
    estado:                       boolean;
    facturable:                   boolean;
    conceptoRipsId:               number;
    clasificacionMatId:           number;
    manualTarifaMaterialesInsIds: number[];
}

export interface InputMaterials_API {
    id:                        number;
    nombre:                    string;
    codigo:                    string;
    estado:                    boolean;
    facturable:                boolean;
    conceptoRips:              NameIdEntity_API;
    clasificacionMat:          MaterialClassification_API;
    manualTarifaMaterialesIns: NameStateEntity_API[];
}

export interface InputMaterials_PageResponse extends ResponseAPI<PageAPI<InputMaterials_API>> {}
export interface InputMaterials_PageAPI extends PageAPI<InputMaterials_API> {}
export interface InputMaterials_ListResponse extends ResponseAPI<InputMaterials_API[]> {}
export interface InputMaterials_Response extends ResponseAPI<InputMaterials_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface InputMaterials_APP {
    id:                          number; // id
    name:                        string; // nombre
    code:                        string; // codigo
    status:                      boolean; // estado
    billable:                    boolean; // facturable
    ripsConcept:                 NameIdEntity_API; // conceptoRips
    materialClassification:      MaterialClassification_APP; // clasificacionMat
    manualInputMaterialsTariffs: NameStateEntity_APP[]; // manualTarifaMaterialesIns
}
export interface InputMaterials_APPDTO {
    name:                          string; // nombre
    status:                        boolean; // estado
    billable:                      boolean; // facturable
    ripsConceptId:                 number; // conceptoRipsId
    materialClassificationId:      number; // clasificacionMatId
    manualInputMaterialsTariffIds: number[]; // manualTarifaMaterialesInsIds
}

export interface InputMaterials_PageAPP extends PageAPI<InputMaterials_APP> {}