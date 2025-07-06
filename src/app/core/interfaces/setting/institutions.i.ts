import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Apartment_API, Apartment_APP, Municipality_API, Municipality_APP, NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface Base_API {
    codigoHabitacion:   string;
    nombre:             string;
    direccion:          string;
    telefono:           string;
    correo:             string;
}

export interface Institutions_DTO extends Base_API {
    departamentoId:       number;
    municipioId:          number;
    nivelComplejidadId:   number;
    naturalezaJuridicaId: number;
    tipoRemisionId:       number;
}

export interface Institutions_API extends Base_API {
    id:                 number;
    departamento:       Apartment_API;
    municipio:          Municipality_API;
    nivelComplejidad:   NameIdEntity_API;
    naturalezaJuridica: NameIdEntity_API;
    tipoRemision:       NameIdEntity_API;
}

export interface Institutions_PageResponse extends ResponseAPI<PageAPI<Institutions_API>> {}
export interface Institutions_PageAPI extends PageAPI<Institutions_API> {}
export interface Institutions_ListResponse extends ResponseAPI<Institutions_API[]> {}
export interface Institutions_Response extends ResponseAPI<Institutions_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface Base_APP {
    roomCode: string;         // codigoHabitacion
    name: string;             // nombre
    address: string;          // direccion
    phone: string;            // telefono
    email: string;            // correo
}

export interface Institutions_APPDTO extends Base_APP {
    departmentId: number;            // departamentoId
    municipalityId: number;          // municipioId
    complexityLevelId: number;       // nivelComplejidadId
    legalNatureId: number;           // naturalezaJuridicaId
    referralTypeId: number;          // tipoRemisionId
}

export interface Institutions_APP  extends Base_APP {
    id: number;                                // id
    department: Apartment_APP;                 // departamento
    municipality: Municipality_APP;            // municipio
    complexityLevel: NameIdEntity_APP;      // nivelComplejidad
    legalNature: NameIdEntity_APP;          // naturalezaJuridica
    referralType: NameIdEntity_APP;         // tipoRemision
}

export interface Institutions_Detail extends Base_APP {
    department: string;
    municipality: string;
    complexityLevel: string;
    legalNature: string;
    referralType: string;
}

export interface Institutions_PageAPP extends PageAPI<Institutions_APP> {}