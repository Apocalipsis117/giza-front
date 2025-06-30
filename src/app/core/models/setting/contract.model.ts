import { Contract_API, Contract_APP, Contract_APPDTO, Contract_DTO } from "@interfaces/index";
import { AdministrativeEntity } from "./administrative-entities.model";
import { NameIdEntity, NameStateEntity } from "../single-query/name-entity.m";
import { OxygenRate } from "./oxygen-rate.model";
import { AttentionProgram } from "./attention-program.m";

export class ContractDTO {
    static setProperty(input: Contract_APPDTO): string {
        return new ContractDTO(input).data;
    }
    constructor(public input: Contract_APPDTO) {}

    get data(): string {
        const data: Contract_DTO = {
            numContrato: this.input.contractNumber,
            nombreContrato: this.input.contractName,
            fechaInicio: this.input.startDate,
            fechaFin: this.input.endDate,
            upc: this.input.upc,
            vigente: this.input.active,
            cuentaCobroFactura: this.input.invoiceAccount,
            observacion: this.input.observation,
            facturacioGrupal: this.input.groupBilling,
            autambulatorio: this.input.outpatientAuthorization,
            autHospitalizacion: this.input.hospitalizationAuthorization,
            autUrgencia: this.input.emergencyAuthorization,
            verificacionDerechos: this.input.rightsVerification,
            multivitaminicos: this.input.multivitamins,
            soat: this.input.soat,
            copago: this.input.copayment,
            planBeneficioId: this.input.benefitPlanId,
            manualTarifiarioId: this.input.tariffManualId,
            tipoAtencionId: this.input.careTypeId,
            nivelId: this.input.levelId,
            codigo: this.input.code,
            entidadesAdministradorasId: this.input.administratorEntitiesId,
            mtarifaMaterialesInsId: this.input.materialsSuppliesTariffId,
            mtarifaMedicamentoId: this.input.medicationTariffId,
            mtarifaOxigenoId: this.input.oxygenTariffId,
            mtarifaTrasladosId: this.input.transfersTariffId,
            numUsuariosAdicionales: this.input.additionalUsersNumber,
            programasAtencionId: this.input.attentionProgramsId,
            tipoPagoModeradoId: this.input.moderatePaymentTypeId,
            valorContrato: this.input.contractValue
        };

        return JSON.stringify(data);
    }
}

export class Contract {
    static setProperty(input: Contract_API) {
        return new Contract(input).data;
    }
    constructor(public input: Contract_API) {}

    get data(): Contract_APP  {
        return {
            active: this.input.vigente,
            additionalUsersNumber: this.input.numUsuariosAdicionales,
            administratorEntities: AdministrativeEntity.setProperty(this.input.entidadesAdministradoras),
            benefitPlan: NameIdEntity.setProperty(this.input.planBeneficio),
            attentionPrograms: this.attentionPrograms(),
            careType: NameIdEntity.setProperty(this.input.tipoAtencion),
            code: this.input.codigo,
            contractName: this.input.nombreContrato,
            contractNumber: this.input.numContrato,
            contractValue: this.input.valorContrato,
            copayment: this.input.copago,
            emergencyAuthorization: this.input.autUrgencia,
            endDate: this.input.fechaFin,
            groupBilling: this.input.facturacioGrupal,
            hospitalizationAuthorization: this.input.autHospitalizacion,
            invoiceAccount: this.input.cuentaCobroFactura,
            level: NameIdEntity.setProperty(this.input.nivel),
            materialsSuppliesTariff: NameStateEntity.setProperty(this.input.mtarifaMaterialesIns),
            medicationTariff: NameStateEntity.setProperty(this.input.mtarifaMedicamento),
            moderatePaymentType: NameIdEntity.setProperty(this.input.tipoPagoModerado),
            multivitamins: this.input.multivitaminicos,
            observation: this.input.observacion,
            outpatientAuthorization: this.input.autambulatorio,
            oxygenTariff: OxygenRate.setProperty(this.input.mtarifaOxigeno),
            rightsVerification: this.input.verificacionDerechos,
            soat: this.input.soat,
            startDate: this.input.fechaInicio,
            tariffManual: NameStateEntity.setProperty(this.input.manualTarifiario),
            transfersTariff: NameStateEntity.setProperty(this.input.mtarifaTraslados),
            upc: this.input.upc,
            uuid: this.input.uuid
        };
    }

    attentionPrograms() {
        return this.input.programasAtencion.map(x => AttentionProgram.setProperty(x))
    }
}
