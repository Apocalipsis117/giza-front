import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Apartment_API, Apartment_APP, Municipality_API, Municipality_APP, TypeRegime_API, TypeRegime_APP } from "@interfaces/index";

// entidades-administradoras

/**
 * ---------------------------
 * API
 * ---------------------------
 */

interface Base_API {
    codigo:                  number;
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
}

export interface AdministrativeEntity_DTO extends Base_API {
    regimenId:               number;
    departamentoId:          number;
    municipioId:             number;
}

export interface AdministrativeEntity_API extends Base_API {
    id:                      number;
    regimen:                 TypeRegime_API;
    municipio:               Municipality_API;
    departamento:            Apartment_API;
}

export interface AdministrativeEntity_PageAPI extends PageAPI<AdministrativeEntity_API> {}
export interface AdministrativeEntity_Response extends ResponseAPI<AdministrativeEntity_API> {}
export interface AdministrativeEntity_ListResponse extends ResponseAPI<AdministrativeEntity_API[]> {}
export interface AdministrativeEntity_PageResponse extends ResponseAPI<PageAPI<AdministrativeEntity_API>> {}


/**
 * ---------------------------
 * APP
 * ---------------------------
 */

// Común
interface Base_APP {
    code:                   number; // codigo
    name:                   string; // nombre
    nit:                    string; // nit
    address:                string; // direccion
    filingAddress:          string; // direccionRadicacion
    email:                  string; // correo
    electronicBillingEmail: string; // correoFactuElect
    soat:                   boolean; // soat
    status:                 boolean; // estado
    phone:                  string; // telefono
    authorizationLength:    number; // longitudAutorizacion
    otherData:              string; // otrosDatos
    requiresAnnex2:         boolean; // requiereAnexo2
    reportResolution256:    boolean; // reporteResolucion256
    templateResolution1552: boolean; // plantillaResolucion1552
}

export interface AdministrativeEntity_APPDTO extends Base_APP {
    regimeId:       number; // regimenId
    departmentId:   number; // departamentoId
    municipalityId: number; // municipioId
}

export interface AdministrativeEntity_APP extends Base_APP {
    id:          number;              // id
    regime:      TypeRegime_APP;      // regimen
    municipality: Municipality_APP;   // municipio
    department:  Apartment_APP;       // departamento
}


export interface AdministrativeEntity_PageAPP extends PageAPI<AdministrativeEntity_APP> {}