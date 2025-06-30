import { NameStateEntity_API, NameStateEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface MedicineRateManual_DTO {
    maunualTarifaMedicamentoId: number;
    valor:                      number;
}

export interface MedicineRateManual_API {
    id:                      number;
    manualTarifaMedicamento: NameStateEntity_API;
    valor:                   number;
}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface MedicineRateManual_APPDTO {
    medicineTariffManualId: number; // maunualTarifaMedicamentoId
    value: number; // valor
}

export interface MedicineRateManual_APP {
    id: number; // id
    medicineTariffManual: NameStateEntity_APP; // manualTarifaMedicamento
    value: number; // valor
}