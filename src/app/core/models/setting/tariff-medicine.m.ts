import { TariffMedicine_API, TariffMedicine_APP, TariffMedicine_APPDTO, TariffMedicine_DTO } from "@interfaces/setting/tariff-medicine.i";
import { Medicine } from "./medicine.model";
import { NameStateEntity } from "../single-query/name-entity.m";

export class TariffMedicineDTO {
    static setProperty(input: TariffMedicine_APPDTO) {
        return new TariffMedicineDTO(input).data;
    }
    constructor(public input: TariffMedicine_APPDTO) {}

    get data() {
        const data: TariffMedicine_DTO = {
            manualTarifaMedicaientoId: this.input.medicineTariffManualId,
            medicamentoId: this.input.medicineId,
            valor: this.input.value
        }
        return JSON.stringify(data);
    }
}

export class TariffMedicine {
    static setProperty(input: TariffMedicine_API) {
        return new TariffMedicine(input).data;
    }
    constructor(public input: TariffMedicine_API) {}

    get data(): TariffMedicine_APP {
        return {
            id: this.input.id,
            medicine: Medicine.setProperty(this.input.medicamento),
            medicineTariffManual: NameStateEntity.setProperty(this.input.manualTarifaMedicamento),
            value: this.input.valor
        };
    }
}