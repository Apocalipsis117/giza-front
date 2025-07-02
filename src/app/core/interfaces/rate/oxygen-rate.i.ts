import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Medicine_API, Medicine_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface OxygenRate_API {
    id:         number;
    nombre:        string;
    valor:         number;
    estado:        boolean;
    medicamento:   Medicine_API;
}

export interface OxygenRate_DTO {
    nombre:        string;
    valor:         number;
    estado:        boolean;
    medicamentoId: number;
}

export interface OxygenRate_PageResponse extends ResponseAPI<PageAPI<OxygenRate_API>> {}
export interface OxygenRate_PageAPI extends PageAPI<OxygenRate_API> {}
export interface OxygenRate_ListResponse extends ResponseAPI<OxygenRate_API[]> {}
export interface OxygenRate_Response extends ResponseAPI<OxygenRate_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface OxygenRate_APP {
    id:       number; // id
    name:     string; // nombre
    value:    number; // valor
    status:   boolean; // estado
    medicine: Medicine_APP; // medicamento
}
export interface OxygenRate_APPDTO {
    name:       string; // nombre
    value:      number; // valor
    status:     boolean; // estado
    medicineId: number; // medicamentoId
}

export interface OxygenRate_PageAPP extends PageAPI<OxygenRate_APP> {}