import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface CostCenter_API {
    id:             number;
    nombre:         string;
    cuentaContable: string;
    estado:         boolean;
    area:           NameIdEntity_API | null;
}
export interface CostCenter_DTO {
    nombre:         string;
    cuentaContable: string;
    estado:         boolean;
    areaId:         number;
}

export interface CostCenter_PageResponse extends ResponseAPI<PageAPI<CostCenter_API>> {}
export interface CostCenter_PageAPI extends PageAPI<CostCenter_API> {}
export interface CostCenter_ListResponse extends ResponseAPI<CostCenter_API[]> {}
export interface CostCenter_Response extends ResponseAPI<CostCenter_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface CostCenter_APP {
    id: number; // id
    name: string; // nombre
    accountingAccount: string; // cuentaContable
    status: boolean; // estado
    area: NameIdEntity_APP | null; // area
}

export interface CostCenter_APPDTO {
    name: string; // nombre
    accountingAccount: string; // cuentaContable
    status: boolean; // estado
    areaId: number; // areaId
}

export interface CostCenter_PageAPP extends PageAPI<CostCenter_APP> {}