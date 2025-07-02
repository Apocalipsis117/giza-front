import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { NameStateEntity_API, NameStateEntity_APP, Medicine_APP, Medicine_API } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface MedicineRate_DTO {
    valor:                     number;
    medicamentoId:             number;
    manualTarifaMedicaientoId: number;
}

export interface MedicineRate_API {
    id:                      number;
    valor:                   number;
    medicamento:             Medicine_API;
    manualTarifaMedicamento: NameStateEntity_API;
}

export interface MedicineRate_PageResponse extends ResponseAPI<PageAPI<MedicineRate_API>> {}
export interface MedicineRate_PageAPI extends PageAPI<MedicineRate_API> {}
export interface MedicineRate_ListResponse extends ResponseAPI<MedicineRate_API[]> {}
export interface MedicineRate_Response extends ResponseAPI<MedicineRate_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface MedicineRate_APP {
    id:                   number; // id
    value:                number; // valor
    medicine:             Medicine_APP; // medicamento
    medicineTariffManual: NameStateEntity_APP; // manualTarifaMedicamento
}

export interface MedicineRate_APPDTO {
    value:                  number; // valor
    medicineId:             number; // medicamentoId
    medicineTariffManualId: number; // manualTarifaMedicaientoId
}

export interface MedicineRate_PageAPP extends PageAPI<MedicineRate_APP> {}