import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Gender_API, Gender_APP } from "@interfaces/single-query/gender.i";
import { TypeHistory_API, TypeHistory_APP } from "@interfaces/single-query/type-history.i";
import { CostCenter_API, CostCenter_APP } from "./cost-center.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface AttentionProgram_DTO {
    nombre:         string;
    nombreCorto:    string;
    edadMin:        string;
    edadMax:        string;
    sexoId:         number;
    tipoHistoriaId: number;
    centroCostoId:  number;
}
export interface AttentionProgram_API {
    id:           number;
    nombre:       string;
    nombreCorto:  string;
    edadMin:      string;
    edadMax:      string;
    sexo:         Gender_API;
    tipoHistoria: TypeHistory_API;
    centroCosto:  CostCenter_API;
}

export interface AttentionProgram_PageResponse extends ResponseAPI<PageAPI<AttentionProgram_API>> {}
export interface AttentionProgram_PageAPI extends PageAPI<AttentionProgram_API> {}
export interface AttentionProgram_ListResponse extends ResponseAPI<AttentionProgram_API[]> {}
export interface AttentionProgram_Response extends ResponseAPI<AttentionProgram_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface AttentionProgram_APPDTO {
    name:          string; // nombre
    shortName:     string; // nombreCorto
    minAge:        string; // edadMin
    maxAge:        string; // edadMax
    genderId:      number; // sexoId
    historyTypeId: number; // tipoHistoriaId
    costCenterId:  number; // centroCostoId
}
export interface AttentionProgram_APP {
    id:          number; // id
    name:        string; // nombre
    shortName:   string; // nombreCorto
    minAge:      string; // edadMin
    maxAge:      string; // edadMax
    gender:      Gender_APP; // sexo
    historyType: TypeHistory_APP; // tipoHistoria
    costCenter:  CostCenter_APP; // centroCosto
}

export interface AttentionProgram_PageAPP extends PageAPI<AttentionProgram_APP> {}