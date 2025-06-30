import { Medicine_API, Medicine_APP, Medicine_APPDTO, Medicine_DTO, MedicineRateManual_API, MedicineRateManual_APPDTO, NameIdEntity_API } from '@interfaces/index';
import { CostCenter, NamedEntity, Service } from '@models/index';
import { MedicineRateManual, MedicineRateManualDTO } from '../single-query/medicine-rate-manual.m';
import { NameIdEntity } from '../single-query/name-entity.m';

export class MedicineDTO {
    static setProperty(input: Medicine_APPDTO) {
        return new MedicineDTO(input).data;
    }
    constructor(public input: Medicine_APPDTO) {}

    get data() {
        const data: Medicine_DTO = {
            atc: this.input.atc,
            centroCostoId: this.input.costCenterId,
            concentracionId: this.input.concentrationId,
            consCum: this.input.cumConsecutive,
            contraindicaciones: this.input.contraindications,
            cum: this.input.cum,
            efectoAdverso: this.input.adverseEffect,
            estado: this.input.status,
            formaFarmaceuticaId: this.input.pharmaceuticalFormId,
            liquido: this.input.liquid,
            nombre: this.input.name,
            nombreCum: this.input.cumName,
            otroNombre: this.input.otherName,
            tipoMedicamentoId: this.input.medicineTypeId,
            tipoServiciosId: this.input.serviceTypeId,
            unidadMedidaId: this.input.unitOfMeasureId,
            unidadReferencia: this.input.referenceUnit,
            codigo: this.input.code,
            interaccionIncompatibilidad: this.input.interactionIncompatibility,
            grupoMedicamentoIds: this.input.medicineGroupIds,
            viaAdministracionIds: this.input.administrationRouteIds,
            medicamentoManualTarifaMed: this.medicineManualTariffMeds(this.input.medicineManualTariffMed)
        }
        return JSON.stringify(data);
    }

    medicineManualTariffMeds(data: MedicineRateManual_APPDTO[]) {
        return data.map(x => MedicineRateManualDTO.setProperty(x))
    }
}


export class Medicine {
    static setProperty(input: Medicine_API) {
        return new Medicine(input).data;
    }
    constructor(public input: Medicine_API) {}

    get data(): Medicine_APP {
        return {
            id: this.input.id,
            code: this.input.codigo,
            name: this.input.nombre,
            atc: this.input.atc,
            cum: this.input.cum,
            cumName: this.input.nombreCum,
            referenceUnit: this.input.unidadReferencia,
            otherName: this.input.otroNombre,
            adverseEffect: this.input.efectoAdverso,
            contraindications: this.input.contraindicaciones,
            interactionIncompatibility: this.input.interaccionIncompatibilidad,
            administrationRoutes: this.nameIdEntities(this.input.viaAdministracion),
            concentration: NamedEntity.setProperty(this.input.concentracion),
            costCenter: CostCenter.setProperty(this.input.centroCosto),
            cumConsecutive: this.input.consCum,
            liquid: this.input.liquido,
            medicineGroups: this.nameIdEntities(this.input.grupoMedicamentos),
            medicineManualTariffMeds: this.medicineManualTariffMeds(this.input.medicamentoManualTarifaMeds),
            medicineType: NameIdEntity.setProperty(this.input.tipoMedicamento),
            pharmaceuticalForm: NameIdEntity.setProperty(this.input.formaFarmaceutica),
            serviceType: Service.setProperty(this.input.tipoServicios),
            status: this.input.estado,
            unitOfMeasure: NameIdEntity.setProperty(this.input.unidadMedida)
        };
    }

    medicineManualTariffMeds(data: MedicineRateManual_API[]) {
        return data.map(x => MedicineRateManual.setProperty(x))
    }

    nameIdEntities(data: NameIdEntity_API[]) {
        return data.map(item => NamedEntity.setProperty(item))
    }
}