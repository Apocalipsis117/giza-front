import { PageAPI, ResponseAPI } from "@interfaces/extend.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    numResolucionDian:     number;
    fechaResolucion:       Date;
    vigenciaResolucion:    Date;
    desdeNumero:           number;
    hastaNumero:           number;
    numFactura:            number;
    numCuentaCobro:        string;
    recibeRemisiones:      boolean;
    imprimeHojasCitas:     boolean;
    manejoHistoriaClinica: boolean;
    vigenciaFormula:       string;
    numDiasEstancias:      number;
    pieCuentaCobro:        string;
}

export interface BillingParameters_DTO extends Base_API {}

export interface BillingParameters_API extends Base_API {}

export interface BillingParameters_PageResponse extends ResponseAPI<PageAPI<BillingParameters_API>> {}
export interface BillingParameters_PageAPI extends PageAPI<BillingParameters_API> {}
export interface BillingParameters_ListResponse extends ResponseAPI<BillingParameters_API[]> {}
export interface BillingParameters_Response extends ResponseAPI<BillingParameters_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    dianResolutionNumber:    number;  // numResolucionDian
    resolutionDate:          Date;    // fechaResolucion
    resolutionValidity:      Date;    // vigenciaResolucion
    fromNumber:              number;  // desdeNumero
    toNumber:                number;  // hastaNumero
    invoiceNumber:           number;  // numFactura
    collectionAccountNumber: string;  // numCuentaCobro
    receivesReferrals:       boolean; // recibeRemisiones
    printsAppointmentSheets: boolean; // imprimeHojasCitas
    handlesMedicalRecords:   boolean; // manejoHistoriaClinica
    prescriptionValidity:    string;  // vigenciaFormula
    stayDaysNumber:          number;  // numDiasEstancias
    collectionAccountFooter: string;  // pieCuentaCobro
}

export interface BillingParameters_APPDTO extends Base_APP {}

export interface BillingParameters_APP extends Base_APP {}

export interface BillingParameters_PageAPP extends PageAPI<BillingParameters_APP> {}