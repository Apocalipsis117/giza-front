import { MedicineAPI, MedicineDTO_API } from '@interfaces/index';
import { MedicineAPP, MedicineDTO_APP } from '@interfaces/app';
import { NamedEntity, Services, CostCenter } from '@models/index';

export class MedicineDTO {
    static setProperty(dataInput: MedicineDTO_APP): string {
        return new MedicineDTO(dataInput).data;
    }
    constructor(public dataInput: MedicineDTO_APP) {}

    get data(): string {
        const data: MedicineDTO_API = {
            atc: this.dataInput.atc,
            centroCostoId: this.dataInput.costCenterId,
            concentracionId: this.dataInput.concentrationId,
            consCum: this.dataInput.consCum,
            contraindicaciones: this.dataInput.contraindications,
            cum: this.dataInput.cum,
            efectoAdverso: this.dataInput.adverseEffect,
            estado: this.dataInput.status,
            formaFarmaceuticaId: this.dataInput.pharmaceuticalFormId,
            liquido: this.dataInput.liquid,
            nombre: this.dataInput.name,
            nombreCum: this.dataInput.cumName,
            otroNombre: this.dataInput.otherName,
            tipoMedicamentoId: this.dataInput.medicationTypeId,
            tipoServiciosId: this.dataInput.serviceTypeId,
            unidadMedidaId: this.dataInput.measurementUnitId,
            unidadReferencia: this.dataInput.referenceUnit,
            codigo: this.dataInput.code,
            interaccionIncompatibilidad: this.dataInput.interactionIncompatibility,
            consecutivo: this.dataInput.consecutive
        }
        return JSON.stringify(data);
    }

}

export class Medicine {
    static setProperty(dataInput: MedicineAPI): MedicineAPP {
        return new Medicine(dataInput).data;
    }
    constructor(public dataInput: MedicineAPI) {}

    get data(): MedicineAPP {
        return {
            id: this.dataInput.id,
            code: this.dataInput.codigo,
            name: this.dataInput.nombre,
            atc: this.dataInput.atc,
            cum: this.dataInput.cum,
            cumCons: this.dataInput.consCum,
            cumName: this.dataInput.nombreCum,
            referenceUnit: this.dataInput.unidadReferencia,
            otherName: this.dataInput.otroNombre,
            adverseEffect: this.dataInput.efectoAdverso,
            contraindications: this.dataInput.contraindicaciones,
            interactionIncompatibility: this.dataInput.interaccionIncompatibilidad,
            isLiquid: this.dataInput.liquido,
            isActive: this.dataInput.estado,
            measurementUnit: this.dataInput.unidadMedida,
            concentration: this.dataInput.concentracion ? NamedEntity.setProperty(this.dataInput.concentracion) : null,
            costCenter: CostCenter.setProperty(this.dataInput.centroCosto),
            medicineType: NamedEntity.setProperty(this.dataInput.tipoMedicamento),
            pharmaceuticalForm: NamedEntity.setProperty(this.dataInput.formaFarmaceutica),
            serviceTypes: Services.setProperty(this.dataInput.tipoServicios)
        };
    }
}