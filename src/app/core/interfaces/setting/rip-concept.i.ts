import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre:         string;
}

export interface RipConcept_DTO extends Base_API {
    tipoServicioId: number;
    grupoSoatId:    number;
}

export interface RipConcept_API extends Base_API {
    id:             number;
    tipoServicio: NameIdEntity_API;
    grupoSoat:    NameIdEntity_API;
}

export interface RipConcept_PageResponse extends ResponseAPI<PageAPI<RipConcept_API>> {}
export interface RipConcept_PageAPI extends PageAPI<RipConcept_API> {}
export interface RipConcept_ListResponse extends ResponseAPI<RipConcept_API[]> {}
export interface RipConcept_Response extends ResponseAPI<RipConcept_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    name: string;
}

export interface RipConcept_APPDTO extends Base_APP {
    serviceTypeId: number;  // tipoServicioId
    soatGroupId: number;    // grupoSoatId
}

export interface RipConcept_APP extends Base_APP {
    id:             number;
    serviceType: NameIdEntity_APP;  // tipoServicioId
    soatGroup: NameIdEntity_APP;    // grupoSoatId
}

export interface RipConcept_PageAPP extends PageAPI<RipConcept_APP> {}