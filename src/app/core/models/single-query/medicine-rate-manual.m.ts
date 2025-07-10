import { MedicineRateManual_API, MedicineRateManual_APP, MedicineRateManual_APPDTO, MedicineRateManual_DTO } from "@interfaces/index";
import { NameStateEntity } from "./name-entity.m";

export class MedicineRateManualDTO {
    static setProperty(input: MedicineRateManual_APPDTO) {
        return new MedicineRateManualDTO(input).data;
    }
    constructor(public input: MedicineRateManual_APPDTO) {}

    get data(): MedicineRateManual_DTO {
        return {
            manualTarifaMedicamentoId: this.input.medicineTariffManualId,
            valor: this.input.value,
            id: this.input.id || null
        }
    }
}

export class MedicineRateManual {
    static setProperty(input: MedicineRateManual_API) {
        return new MedicineRateManual(input).data;
    }
    constructor(public input: MedicineRateManual_API) {}

    get data(): MedicineRateManual_APP {
        return {
            id: this.input.id,
            medicineTariffManual: NameStateEntity.setProperty(this.input.manualTarifaMedicamento),
            value: this.input.valor
        };
    }
}