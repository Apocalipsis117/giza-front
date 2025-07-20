import { BillingParameters_API, BillingParameters_APP, BillingParameters_APPDTO, BillingParameters_DTO } from "@interfaces/setting/billing-parameters.i";

export class BillingParametersDTO {

    static setProperty(input: BillingParameters_APPDTO, isJson: true): string;
    static setProperty(input: BillingParameters_APPDTO, isJson?: false): BillingParameters_DTO;
    static setProperty(input: BillingParameters_APPDTO, isJson: boolean = true): string | BillingParameters_DTO {
        const d = new BillingParametersDTO(input);
        return isJson ? d.dataJson : d.data;
    }
    constructor(public input: BillingParameters_APPDTO) {}

    get data() {
        const _ = this.input;
        const data: BillingParameters_DTO = {
            desdeNumero: _.fromNumber,
            fechaResolucion: _.resolutionDate,
            hastaNumero: _.toNumber,
            imprimeHojasCitas: _.printsAppointmentSheets,
            manejoHistoriaClinica: _.handlesMedicalRecords,
            numCuentaCobro: _.collectionAccountNumber,
            numDiasEstancias: _.stayDaysNumber,
            numFactura: _.invoiceNumber,
            numResolucionDian: _.dianResolutionNumber,
            pieCuentaCobro: _.collectionAccountFooter,
            recibeRemisiones: _.receivesReferrals,
            vigenciaFormula: _.prescriptionValidity,
            vigenciaResolucion: _.resolutionValidity
        }
        return data;
    }
    get dataJson() {
        return JSON.stringify(this.data);
    }
}

export class BillingParameters {
    static setProperty(input: BillingParameters_API) {
        return new BillingParameters(input).data;
    }
    constructor(public input: BillingParameters_API) {}

    get data(): BillingParameters_APP {
        const _ = this.input;
        return {
            collectionAccountFooter: _.pieCuentaCobro,
            collectionAccountNumber: _.numCuentaCobro,
            dianResolutionNumber: _.numResolucionDian,
            fromNumber: _.desdeNumero,
            handlesMedicalRecords: _.manejoHistoriaClinica,
            invoiceNumber: _.numFactura,
            prescriptionValidity: _.vigenciaFormula,
            printsAppointmentSheets: _.imprimeHojasCitas,
            receivesReferrals: _.recibeRemisiones,
            resolutionDate: _.fechaResolucion,
            resolutionValidity: _.vigenciaResolucion,
            stayDaysNumber: _.numDiasEstancias,
            toNumber: _.hastaNumero
        };
    }
}