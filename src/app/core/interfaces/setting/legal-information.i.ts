import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre:                 string;
    estado:                 boolean;
}

export interface LegalInformation_DTO extends Base_API {
    imgFirma:               string;
    tipoRepresentanteIpsId: number;
}

export interface LegalInformation_API extends Base_API {
    uuid:                 string;
    pathFirma:            string;
    tipoRepresentanteIps: NameIdEntity_API;
}

export interface LegalInformation_PageResponse extends ResponseAPI<PageAPI<LegalInformation_API>> {}
export interface LegalInformation_PageAPI extends PageAPI<LegalInformation_API> {}
export interface LegalInformation_ListResponse extends ResponseAPI<LegalInformation_API[]> {}
export interface LegalInformation_Response extends ResponseAPI<LegalInformation_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    name:                 string; // nombre
    status:               boolean; // estado
}

export interface LegalInformation_APPDTO extends Base_APP {
    signatureImg:         string; // imgFirma
    healthcareRepTypeId:  number; // tipoRepresentanteIpsId
}

export interface LegalInformation_APP extends Base_APP {
    uuid:                string; // uuid
    signaturePath:       string; // pathFirma
    healthcareRepType:   NameIdEntity_APP; // tipoRepresentanteIps
}

export interface LegalInformation_PageAPP extends PageAPI<LegalInformation_APP> {}