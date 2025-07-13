import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Diagnosis_API, Diagnosis_APP, Gender_API, Gender_APP, ServicePrograms_API, ServicePrograms_APP, ServicePrograms_APPDTO, ServicePrograms_DTO, TypeHistory_API, TypeHistory_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre:            string;
    nombreCorto:       string;
    edadMin:           string;
    edadMax:           string;
}

export interface CarePrograms_DTO extends Base_API {
    sexoId:            number;
    tipoHistoriaIds:   number[];
    diagnosticoIds:    number[];
    programaServicios: ServicePrograms_DTO[];
}

export interface CarePrograms_API extends Base_API {
    id:                number;
    sexo: Gender_API;
    tipoHistorias: TypeHistory_API[];
    diagnosticos: Diagnosis_API[];
    programasServicios: ServicePrograms_API[];
}

export interface CarePrograms_PageResponse extends ResponseAPI<PageAPI<CarePrograms_API>> {}
export interface CarePrograms_PageAPI extends PageAPI<CarePrograms_API> {}
export interface CarePrograms_ListResponse extends ResponseAPI<CarePrograms_API[]> {}
export interface CarePrograms_Response extends ResponseAPI<CarePrograms_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    name:            string; // nombre
    shortName:       string; // nombreCorto
    minAge:          number; // edadMin
    maxAge:          number; // edadMax
}

export interface CarePrograms_APPDTO extends Base_APP {
    genderId:        number; // sexoId
    historyTypeIds:  number[]; // tipoHistoriaIds
    diagnosisIds:    number[]; // diagnosticoIds
    programServices: ServicePrograms_APPDTO[]; // programaServicios
}

export interface CarePrograms_APP extends Base_APP {
    id:              number; // id
    gender:          Gender_APP; // sexo
    diagnoses:       Diagnosis_APP[]; // diagnosticos
    historyTypes:    TypeHistory_APP[]; // tipoHistorias
    programServices: ServicePrograms_APP[]; // programasServicios
}

export interface CarePrograms_PageAPP extends PageAPI<CarePrograms_APP> {}
