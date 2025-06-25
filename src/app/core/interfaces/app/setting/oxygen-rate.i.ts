import { MedicineAPP } from "@interfaces/app";
import { PaginateAPI } from "@interfaces/index";

export interface OxygenRateDTO_APP {
    name: string; // nombre
    status: boolean; // estado
    value: number; // valor
    medicationId: number; // medicamento
}

export interface OxigenRateAPP {
    id: number;
    name: string;
    status: boolean;
    value: number;
    medication: MedicineAPP;
}

export interface OxigenRateAPP_PAGE extends PaginateAPI {
    content: OxigenRateAPP[];
}