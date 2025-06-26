import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { TypeRegimeAPI, TypeRegimeAPP } from "@interfaces/index";

// entidades-administradoras

/**
 * ---------------------------
 * API
 * ---------------------------
 */

export interface AdministrativeEntity_DTO {
    codigo:                  string;
    nombre:                  string;
    nit:                     string;
    direccion:               string;
    direccionRadicacion:     string;
    correo:                  string;
    correoFactuElect:        string;
    soat:                    boolean;
    estado:                  boolean;
    telefono:                string;
    longitudAutorizacion:    number;
    otrosDatos:              string;
    requiereAnexo2:          boolean;
    reporteResolucion256:    boolean;
    plantillaResolucion1552: boolean;
    regimenId:               number;
    departamentoId:          number;
    municipioId:             number;
}

export interface AdministrativeEntity_API {
    id: number;
    codigo: number;
    nombre: string;
    nit: string;
    direccion: string;
    direccionRadicacion: string;
    correo: string;
    correoFactuElect: string;
    soat: boolean;
    estado: boolean;
    telefono: string;
    longitudAutorizacion: number;
    numCopias: boolean;
    ripsVerificacionNit: boolean;
    requiereAnexo2: boolean;
    resolucion: string;
    regimen: TypeRegimeAPI;
}

export interface AdministrativeEntity_PageAPI extends PageAPI<AdministrativeEntity_API> {}
export interface AdministrativeEntity_Response extends ResponseAPI<AdministrativeEntity_API> {}
export interface AdministrativeEntity_ListResponse extends ResponseAPI<AdministrativeEntity_API[]> {}


/**
 * ---------------------------
 * APP
 * ---------------------------
 */

export interface AdministrativeEntity_APPDTO {
    code: string;                // codigo
    name: string;                // nombre
    taxId: string;               // nit
    address: string;             // direccion
    filingAddress: string;       // direccionRadicacion
    email: string;               // correo
    electronicBillingEmail: string; // correoFactuElect
    soat: boolean;               // soat
    status: boolean;             // estado
    phone: string;               // telefono
    authorizationLength: number; // longitudAutorizacion
    otherData: string;           // otrosDatos
    requiresAnnex2: boolean;     // requiereAnexo2
    reportResolution256: boolean; // reporteResolucion256
    templateResolution1552: boolean; // plantillaResolucion1552
    regimeId: number;            // regimenId
    departmentId: number;        // departamentoId
    municipalityId: number;      // municipioId
}

export interface AdministrativeEntity_APP {
    id: number;
    code: number; // codigo
    name: string; // nombre
    taxId: string; // nit
    address: string; // direccion
    filingAddress: string; // direccionRadicacion
    email: string; // correo
    electronicBillingEmail: string; // correoFactuElect
    hasInsurance: boolean; // soat
    isActive: boolean; // estado
    phone: string; // telefono
    authorizationLength: number; // longitudAutorizacion
    hasCopies: boolean; // numCopias
    ripsTaxIdVerification: boolean; // ripsVerificacionNit
    requiresAnnex2: boolean; // requiereAnexo2
    resolution: string; // resolucion
    regime: TypeRegimeAPP; // regimen
}

export interface AdministrativeEntity_PageAPP extends PageAPI<AdministrativeEntity_APP> {}