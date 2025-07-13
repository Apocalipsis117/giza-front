import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Gender_API, Gender_APP, NameIdEntity_API, NameIdEntity_APP, OutpatientClinic_API, OutpatientClinic_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    codigo:              string;
    nombre:              string;
    componente:          string;
    edadMin:             string;
    edadMax:             string;
}

export interface ServicePrograms_DTO extends Base_API {
    finalidadConsultaId: number;
    sexoId:              number;
    programasAtencionId: number | null;
    causaExternaId:      number;
}

export interface ServicePrograms_API extends Base_API {
    id:                  number;
    finalidadConsulta: NameIdEntity_API;
    sexo:              Gender_API;
    programasAtencion: string;
    causaExterna:      OutpatientClinic_API;
}

export interface ServicePrograms_PageResponse extends ResponseAPI<PageAPI<ServicePrograms_API>> {}
export interface ServicePrograms_PageAPI extends PageAPI<ServicePrograms_API> {}
export interface ServicePrograms_ListResponse extends ResponseAPI<ServicePrograms_API[]> {}
export interface ServicePrograms_Response extends ResponseAPI<ServicePrograms_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    code:              string; // codigo
    name:              string; // nombre
    component:         string; // componente
    minAge:            number; // edadMin
    maxAge:            number; // edadMax
}

export interface ServicePrograms_APPDTO extends Base_APP {
    id:                   number | null; // id
    consultationPurposeId: number; // finalidadConsultaId
    genderId:             number; // sexoId
    careProgramsId:       number | null; // programasAtencionId
    externalCauseId:      number; // causaExternaId
}

export interface ServicePrograms_APP extends Base_APP {
    id:                   number; // id
    consultationPurpose: NameIdEntity_APP; // finalidadConsulta
    gender:             Gender_APP; // sexo
    carePrograms:       string; // programasAtencion
    externalCause:      OutpatientClinic_APP; // causaExterna
}

export interface ServicePrograms_PageAPP extends PageAPI<ServicePrograms_APP> {}
