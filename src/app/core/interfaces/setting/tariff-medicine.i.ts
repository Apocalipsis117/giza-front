import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Medicine_API, Medicine_APP } from "./medicine.i";
import { NameStateEntity_API, NameStateEntity_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface TariffMedicine_DTO {
    valor:                     number;
    medicamentoId:             number;
    manualTarifaMedicaientoId: number;
}

export interface TariffMedicine_API {
    id:                      number;
    valor:                   number;
    medicamento:             Medicine_API;
    manualTarifaMedicamento: NameStateEntity_API;
}

export interface TariffMedicine_PageResponse extends ResponseAPI<PageAPI<TariffMedicine_API>> {}
export interface TariffMedicine_PageAPI extends PageAPI<TariffMedicine_API> {}
export interface TariffMedicine_ListResponse extends ResponseAPI<TariffMedicine_API[]> {}
export interface TariffMedicine_Response extends ResponseAPI<TariffMedicine_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface TariffMedicine_APP {
    id: number; // id
    value: number; // valor
    medicine: Medicine_APP; // medicamento
    medicineTariffManual: NameStateEntity_APP; // manualTarifaMedicamento
}

export interface TariffMedicine_APPDTO {
    value: number; // valor
    medicineId: number; // medicamentoId
    medicineTariffManualId: number; // manualTarifaMedicaientoId
}

export interface TariffMedicine_PageAPP extends PageAPI<TariffMedicine_APP> {}