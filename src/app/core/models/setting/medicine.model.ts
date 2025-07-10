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
            precioUnidad: this.input.unitPrice,
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
        const _ = this.input;
        return {
            unitPrice: _.precioUnidad,
            id: _.id,
            code: _.codigo,
            name: _.nombre,
            atc: _.atc,
            cum: _.cum,
            cumName: _.nombreCum,
            referenceUnit: _.unidadReferencia,
            otherName: _.otroNombre,
            adverseEffect: _.efectoAdverso,
            contraindications: _.contraindicaciones,
            interactionIncompatibility: _.interaccionIncompatibilidad,
            administrationRoutes: this.nameIdEntities(_.viaAdministracion),
            concentration: NamedEntity.setProperty(_.concentracion),
            costCenter: CostCenter.setProperty(_.centroCosto),
            cumConsecutive: _.consCum,
            liquid: _.liquido,
            medicineGroups: this.nameIdEntities(_.grupoMedicamentos),
            medicineManualTariffMeds: this.medicineManualTariffMeds(_.medicamentoManualTarifaMeds),
            medicineType: NameIdEntity.setProperty(_.tipoMedicamento),
            pharmaceuticalForm: NameIdEntity.setProperty(_.formaFarmaceutica),
            serviceType: Service.setProperty(_.tipoServicios),
            status: _.estado,
            unitOfMeasure: NameIdEntity.setProperty(_.unidadMedida)
        };
    }

    medicineManualTariffMeds(data: MedicineRateManual_API[]) {
        return data.map(x => MedicineRateManual.setProperty(x))
    }

    nameIdEntities(data: NameIdEntity_API[]) {
        return data.map(item => NamedEntity.setProperty(item))
    }
}