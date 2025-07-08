import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP, NameStateEntity_API, NameStateEntity_APP } from "@interfaces/index";
import { MaterialClassification_API, MaterialClassification_APP } from "@interfaces/single-query/material-classification.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre:                       string;
    estado:                       boolean;
    facturable:                   boolean;
}

export interface InputMaterials_DTO extends Base_API {
    conceptoRipsId:               number;
    clasificacionMatId:           number;
    manualTarifaMaterialesInsIds: number[];
}

export interface InputMaterials_API extends Base_API {
    id:                        number;
    codigo:                    string;
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
interface Base_APP {
    name:                        string; // nombre
    status:                      boolean; // estado
    billable:                    boolean; // facturable
}
export interface InputMaterials_APP extends Base_APP {
    id:                          number; // id
    code:                        string; // codigo
    ripsConcept:                 NameIdEntity_APP; // conceptoRips
    materialClassification:      MaterialClassification_APP; // clasificacionMat
    manualInputMaterialsTariffs: NameStateEntity_APP[]; // manualTarifaMaterialesIns
}
export interface InputMaterials_APPDTO extends Base_APP {
    ripsConceptId:                 number; // conceptoRipsId
    materialClassificationId:      number; // clasificacionMatId
    manualInputMaterialsTariffIds: number[]; // manualTarifaMaterialesInsIds
}

export interface InputMaterials_PageAPP extends PageAPI<InputMaterials_APP> {}