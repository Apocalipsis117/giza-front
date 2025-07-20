import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Apartment_API, Apartment_APP, LegalInformation_API, LegalInformation_APP, LegalInformation_APPDTO, LegalInformation_DTO, Municipality_API, Municipality_APP, NameIdEntity_API, NameIdEntity_APP } from "@interfaces/index";
import { BillingParameters_API, BillingParameters_APP, BillingParameters_APPDTO, BillingParameters_DTO } from "@interfaces/setting/billing-parameters.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nit:                string;
    codigo:             string;
    nombre:             string;
    numIdentificacion:  string;
    digitoVerificacion: number;
    prefijo:            string;
    telefono:           string;
    telefonoSiau:       string;
    direccion:          string;
    correo:             string;
    logoIps:            string;
}

interface Ips_AdditionalData {
    nivelId:                 number;
    tipoIdentificacionIpsId: number;
    departamentoId:          number;
    municipioId:             number;
}

export interface Ips_DTO {
    ips:                      Base_API & Ips_AdditionalData;
    datosLegalesIps:          LegalInformation_DTO[];
    parametrosFacturacionIps: BillingParameters_DTO;
}

export interface Ips_API extends Base_API {
    nivel:                    NameIdEntity_API;
    tipoIdentificacionIps:    NameIdEntity_API;
    departamento:             Apartment_API;
    municipio:                Municipality_API;
    datosLegalesIps:          LegalInformation_API[];
    parametrosFacturacionIps: BillingParameters_API;
}

export interface Ips_PageResponse extends ResponseAPI<PageAPI<Ips_API>> {}
export interface Ips_PageAPI extends PageAPI<Ips_API> {}
export interface Ips_ListResponse extends ResponseAPI<Ips_API[]> {}
export interface Ips_Response extends ResponseAPI<Ips_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    taxId:              string;  // nit (Número de Identificación Tributaria)
    code:               string;  // codigo
    name:               string;  // nombre
    identificationNumber: string;  // numIdentificacion
    verificationDigit:  number;  // digitoVerificacion
    prefix:            string;  // prefijo
    phone:             string;  // telefono
    siauPhone:         string;  // telefonoSiau (assuming SIAU is a system name)
    address:           string;  // direccion
    email:             string;  // correo
    ipsLogo: string;  // logoIps (IPS = Institución Prestadora de Salud)
}

interface Ips_AdditionalData_APP {
    levelId:                 number;  // nivelId
    healthcareFacilityIdTypeId: number;  // tipoIdentificacionIpsId
    departmentId:           number;  // departamentoId
    municipalityId:         number;  // municipioId
}

export interface Ips_APPDTO {
    ips:               Base_APP & Ips_AdditionalData_APP;  // ips
    legalInformation:  LegalInformation_APPDTO[];  // datosLegalesIps
    billingParameters: BillingParameters_APPDTO;  // parametrosFacturacionIps
}

export interface Ips_APP extends Base_APP {
    level:                    NameIdEntity_APP;  // nivel
    healthcareFacilityIdType: NameIdEntity_APP;  // tipoIdentificacionIps
    department:               Apartment_APP;     // departamento
    municipality:             Municipality_APP;  // municipio
    legalInformation:         LegalInformation_APP[];  // datosLegalesIps
    billingParameters:        BillingParameters_APP;  // parametrosFacturacionIps
}

export interface Ips_PageAPP extends PageAPI<Ips_APP> {}