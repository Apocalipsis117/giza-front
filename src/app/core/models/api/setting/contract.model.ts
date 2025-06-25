import { ContractDTO_API, ContractDTO_APP } from "@interfaces/index";

export class ContractDTO {
    static setProperty(dataInput: ContractDTO_APP): string {
        return new ContractDTO(dataInput).data;
    }

    constructor(public dataInput: ContractDTO_APP) {}

    get data(): string {
        const data: ContractDTO_API = {
            numContrato: this.dataInput.contractNumber,
            nombreContrato: this.dataInput.contractName,
            fechaInicio: this.dataInput.startDate,
            fechaFin: this.dataInput.endDate,
            upc: this.dataInput.upc,
            vigente: this.dataInput.isActive,
            cuentaCobroFactura: this.dataInput.billingInvoice,
            observacion: this.dataInput.observation,
            facturacioGrupal: this.dataInput.groupBilling,
            autambulatorio: this.dataInput.outpatientAuthorization,
            autHospitalizacion: this.dataInput.hospitalizationAuthorization,
            autUrgencia: this.dataInput.emergencyAuthorization,
            verificacionDerechos: this.dataInput.rightsVerification,
            multivitaminicos: this.dataInput.multivitamins,
            soat: this.dataInput.soatCoverage,
            copago: this.dataInput.copayment,
            administradoraId: this.dataInput.administratorId,
            planBeneficioId: this.dataInput.benefitPlanId,
            manualTarifiarioId: this.dataInput.tariffManualId,
            mTarifaMedicamentoId: this.dataInput.medicationTariffId,
            mTarifaMaterialesInsId: this.dataInput.materialsTariffId,
            mTarifaTrasladosId: this.dataInput.transfersTariffId,
            mTarifaOxigenoId: this.dataInput.oxygenTariffId,
            tipoAtencionId: this.dataInput.careTypeId,
            nivelId: this.dataInput.levelId
        };

        return JSON.stringify(data);
    }
}
