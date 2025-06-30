import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { InputMaterials_API, InputMaterials_APP } from "./input-materials.i";
import { NameStateEntity_API, NameStateEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface InputMaterialsRate_API {
    id:              number;
    valor:           number;
    materialesIns:   InputMaterials_API;
    mtMaterialesIns: NameStateEntity_API;
}
export interface InputMaterialsRate_DTO {
    valor:             number;
    materialesInsId:   number;
    mtMaterialesInsId: number;
}

export interface InputMaterialsRate_PageResponse extends ResponseAPI<PageAPI<InputMaterialsRate_API>> {}
export interface InputMaterialsRate_PageAPI extends PageAPI<InputMaterialsRate_API> {}
export interface InputMaterialsRate_ListResponse extends ResponseAPI<InputMaterialsRate_API[]> {}
export interface InputMaterialsRate_Response extends ResponseAPI<InputMaterialsRate_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface InputMaterialsRate_APP {
    id: number; // id
    value: number; // valor
    inputMaterials: InputMaterials_APP; // materialesIns
    inputMaterialsManual: NameStateEntity_APP; // mtMaterialesIns
}

export interface InputMaterialsRate_APPDTO {
    value: number; // valor
    inputMaterialsId: number; // materialesInsId
    inputMaterialsManualId: number; // mtMaterialesInsId
}

export interface InputMaterialsRate_PageAPP extends PageAPI<InputMaterialsRate_APP> {}