import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Gender_API, Gender_APP } from "@interfaces/single-query/gender.i";
import { TypeHistory_API, TypeHistory_APP } from "@interfaces/single-query/type-history.i";
import { CostCenter_API, CostCenter_APP } from "./cost-center.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */

interface Base_API {
    nombre:         string;
    nombreCorto:  string;
    edadMin:      string;
    edadMax:      string;
}

export interface AttentionProgram_DTO extends Base_API {
    sexoId:         number;
    tipoHistoriaId: number;
    centroCostoId:  number;
}
export interface AttentionProgram_API extends Base_API {
    id:           number;
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

interface Base_APP {
    name:          string; // nombre
    shortName:     string; // nombreCorto
    minAge:        string; // edadMin
    maxAge:        string; // edadMax
}

export interface AttentionProgram_APPDTO extends Base_APP {
    genderId:      number; // sexoId
    historyTypeId: number; // tipoHistoriaId
    costCenterId:  number; // centroCostoId
}
export interface AttentionProgram_APP  extends Base_APP {
    id:          number; // id
    gender:      Gender_APP; // sexo
    historyType: TypeHistory_APP; // tipoHistoria
    costCenter:  CostCenter_APP; // centroCosto
}

export interface AttentionProgram_PageAPP extends PageAPI<AttentionProgram_APP> {}