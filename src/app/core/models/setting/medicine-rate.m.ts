import { MedicineRate_API, MedicineRate_APP, MedicineRate_APPDTO, MedicineRate_DTO } from "@interfaces/index";
import { Medicine } from "./medicine.model";
import { NameStateEntity } from "../single-query/name-entity.m";

export class MedicineRateDTO {
    static setProperty(input: MedicineRate_APPDTO) {
        return new MedicineRateDTO(input).data;
    }
    constructor(public input: MedicineRate_APPDTO) {}

    get data() {
        const data: MedicineRate_DTO = {
            manualTarifaMedicaientoId: this.input.medicineTariffManualId,
            medicamentoId: this.input.medicineId,
            valor: this.input.value
        }
        return JSON.stringify(data);
    }
}

export class MedicineRate {
    static setProperty(input: MedicineRate_API) {
        return new MedicineRate(input).data;
    }
    constructor(public input: MedicineRate_API) {}

    get data(): MedicineRate_APP {
        return {
            id: this.input.id,
            medicine: Medicine.setProperty(this.input.medicamento),
            medicineTariffManual: NameStateEntity.setProperty(this.input.manualTarifaMedicamento),
            value: this.input.valor
        };
    }
}