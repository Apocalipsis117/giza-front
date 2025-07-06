import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { CostCenter_API, CostCenter_APP } from "./cost-center.i";
import { NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre:        string;
    edadMin:       string;
    edadMax:       string;
    estado:        boolean;
    numCamas:      number;}

export interface HospitalService_DTO extends Base_API {
    sexoId:        number;
    ambitoId:      number;
    centroCostoId: number;
}

export interface HospitalService_API extends Base_API {
    id:            number;
    centroCosto: CostCenter_API;
    ambito: NameIdEntity_API;
    sexo: NameIdEntity_API;
}

export interface HospitalService_PageResponse extends ResponseAPI<PageAPI<HospitalService_API>> {}
export interface HospitalService_PageAPI extends PageAPI<HospitalService_API> {}
export interface HospitalService_ListResponse extends ResponseAPI<HospitalService_API[]> {}
export interface HospitalService_Response extends ResponseAPI<HospitalService_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    name: string;          // nombre
    minAge: string;        // edadMin
    maxAge: string;        // edadMax
    status: boolean;       // estado
    bedCount: number;      // numCamas
}

export interface HospitalService_APPDTO extends Base_APP {
    genderId: number;          // sexoId
    scopeId: number;           // ambitoId
    costCenterId: number;      // centroCostoId
}

export interface HospitalService_APP extends Base_APP {
    id: number;                            // id
    costCenter: CostCenter_APP;            // centroCosto
    scope: NameIdEntity_APP;               // ambito
    gender: NameIdEntity_APP;              // sexo
}

export interface HospitalService_PageAPP extends PageAPI<HospitalService_APP> {}