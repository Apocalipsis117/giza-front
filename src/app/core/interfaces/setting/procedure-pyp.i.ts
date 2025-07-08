import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    codigo:            string;
    nombre:            string;
}

export interface ProcedurePyp_DTO extends Base_API {
    tipoServicioPyPId: number;
}

export interface ProcedurePyp_API extends Base_API {
    id:              number;
    tipoServicioPyP: NameIdEntity_API;
}

export interface ProcedurePyp_PageResponse extends ResponseAPI<PageAPI<ProcedurePyp_API>> {}
export interface ProcedurePyp_PageAPI extends PageAPI<ProcedurePyp_API> {}
export interface ProcedurePyp_ListResponse extends ResponseAPI<ProcedurePyp_API[]> {}
export interface ProcedurePyp_Response extends ResponseAPI<ProcedurePyp_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    code:            string; // codigo
    name:            string; // nombre
}

export interface ProcedurePyp_APPDTO extends Base_APP {
    pypServiceTypeId: number; // tipoServicioPyPId
}

export interface ProcedurePyp_APP extends Base_APP {
    id:              number; // id
    pypServiceType: NameIdEntity_APP; // tipoServicioPyP
}

export interface ProcedurePyp_PageAPP extends PageAPI<ProcedurePyp_APP> {}
