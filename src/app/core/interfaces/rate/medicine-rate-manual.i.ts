import { NameStateEntity_API, NameStateEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface MedicineRateManual_DTO {
    manualTarifaMedicamentoId: number;
    valor:                      number;
    id:                      number | null;
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
    id?:                    number;
    medicineTariffManualId: number; // maunualTarifaMedicamentoId
    value:                  number; // valor
}

export interface MedicineRateManual_APP {
    id:                   number; // id
    medicineTariffManual: NameStateEntity_APP; // manualTarifaMedicamento
    value:                number; // valor
}