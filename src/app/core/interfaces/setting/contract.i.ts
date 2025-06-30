/**
 * ---------------------------
 * API
 * ---------------------------
 */

import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameIdEntity_API, NameIdEntity_APP, NameStateEntity_API, NameStateEntity_APP, OxygenRate_API, OxygenRate_APP } from "@interfaces/index";
import { AdministrativeEntity_API, AdministrativeEntity_APP } from "./administrative-entities.i";
import { AttentionProgram_API, AttentionProgram_APP } from "./attention-program.i";

export interface Contract_DTO {
    codigo:                     number;
    numContrato:                string;
    nombreContrato:             string;
    fechaInicio:                Date;
    fechaFin:                   Date;
    upc:                        number;
    vigente:                    boolean;
    numUsuariosAdicionales:     string;
    valorContrato:              number;
    cuentaCobroFactura:         string;
    observacion:                string;
    facturacioGrupal:           boolean;
    autambulatorio:             boolean;
    autHospitalizacion:         boolean;
    autUrgencia:                boolean;
    verificacionDerechos:       boolean;
    multivitaminicos:           boolean;
    soat:                       boolean;
    copago:                     boolean;
    entidadesAdministradorasId: number;
    planBeneficioId:            number;
    manualTarifiarioId:         number;
    mtarifaMedicamentoId:       number;
    mtarifaMaterialesInsId:     number;
    mtarifaTrasladosId:         number;
    mtarifaOxigenoId:           number;
    tipoAtencionId:             number;
    nivelId:                    number;
    tipoPagoModeradoId:         number;
    programasAtencionId:        number[];
}

export interface Contract_API {
    uuid:                     string;
    codigo:                   number;
    numContrato:              string;
    nombreContrato:           string;
    fechaInicio:              Date;
    fechaFin:                 Date;
    upc:                      number;
    vigente:                  boolean;
    numUsuariosAdicionales:   string;
    valorContrato:            number;
    cuentaCobroFactura:       string;
    observacion:              string;
    facturacioGrupal:         boolean;
    autambulatorio:           boolean;
    autHospitalizacion:       boolean;
    autUrgencia:              boolean;
    verificacionDerechos:     boolean;
    multivitaminicos:         boolean;
    soat:                     boolean;
    copago:                   boolean;
    entidadesAdministradoras: AdministrativeEntity_API;
    planBeneficio:            NameIdEntity_API;
    manualTarifiario:         NameStateEntity_API;
    mtarifaMedicamento:       NameStateEntity_API;
    mtarifaMaterialesIns:     NameStateEntity_API;
    mtarifaTraslados:         NameStateEntity_API;
    mtarifaOxigeno:           OxygenRate_API;
    tipoAtencion:             NameIdEntity_API;
    nivel:                    NameIdEntity_API;
    tipoPagoModerado:         NameIdEntity_API;
    programasAtencion:        AttentionProgram_API[];
}

export interface Contract_PageResponse extends ResponseAPI<PageAPI<Contract_API>> {}
export interface Contract_PageAPI extends PageAPI<Contract_API> {}
export interface Contract_ListResponse extends ResponseAPI<Contract_API[]> {}
export interface Contract_Response extends ResponseAPI<Contract_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */

export interface Contract_APPDTO {
    code: number; // codigo
    contractNumber: string; // numContrato
    contractName: string; // nombreContrato
    startDate: Date; // fechaInicio
    endDate: Date; // fechaFin
    upc: number; // upc
    active: boolean; // vigente
    additionalUsersNumber: string; // numUsuariosAdicionales
    contractValue: number; // valorContrato
    invoiceAccount: string; // cuentaCobroFactura
    observation: string; // observacion
    groupBilling: boolean; // facturacioGrupal
    outpatientAuthorization: boolean; // autambulatorio
    hospitalizationAuthorization: boolean; // autHospitalizacion
    emergencyAuthorization: boolean; // autUrgencia
    rightsVerification: boolean; // verificacionDerechos
    multivitamins: boolean; // multivitaminicos
    soat: boolean; // soat
    copayment: boolean; // copago
    administratorEntitiesId: number; // entidadesAdministradorasId
    benefitPlanId: number; // planBeneficioId
    tariffManualId: number; // manualTarifiarioId
    medicationTariffId: number; // mtarifaMedicamentoId
    materialsSuppliesTariffId: number; // mtarifaMaterialesInsId
    transfersTariffId: number; // mtarifaTrasladosId
    oxygenTariffId: number; // mtarifaOxigenoId
    careTypeId: number; // tipoAtencionId
    levelId: number; // nivelId
    moderatePaymentTypeId: number; // tipoPagoModeradoId
    attentionProgramsId: number[]; // programasAtencionId
}
export interface Contract_APP {
    uuid: string; // uuid
    code: number; // codigo
    contractNumber: string; // numContrato
    contractName: string; // nombreContrato
    startDate: Date; // fechaInicio
    endDate: Date; // fechaFin
    upc: number; // upc
    active: boolean; // vigente
    additionalUsersNumber: string; // numUsuariosAdicionales
    contractValue: number; // valorContrato
    invoiceAccount: string; // cuentaCobroFactura
    observation: string; // observacion
    groupBilling: boolean; // facturacioGrupal
    outpatientAuthorization: boolean; // autambulatorio
    hospitalizationAuthorization: boolean; // autHospitalizacion
    emergencyAuthorization: boolean; // autUrgencia
    rightsVerification: boolean; // verificacionDerechos
    multivitamins: boolean; // multivitaminicos
    soat: boolean; // soat
    copayment: boolean; // copago
    administratorEntities: AdministrativeEntity_APP; // entidadesAdministradoras
    benefitPlan: NameIdEntity_APP; // planBeneficio
    tariffManual: NameStateEntity_APP; // manualTarifiario
    medicationTariff: NameStateEntity_APP; // mtarifaMedicamento
    materialsSuppliesTariff: NameStateEntity_APP; // mtarifaMaterialesIns
    transfersTariff: NameStateEntity_APP; // mtarifaTraslados
    oxygenTariff: OxygenRate_APP; // mtarifaOxigeno
    careType: NameIdEntity_APP; // tipoAtencion
    level: NameIdEntity_APP; // nivel
    moderatePaymentType: NameIdEntity_APP; // tipoPagoModerado
    attentionPrograms: AttentionProgram_APP[]; // programasAtencion
}

export interface Contract_PageAPP extends PageAPI<Contract_APP> {}