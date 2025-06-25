import { MedicineAPI, PaginateAPI } from "@interfaces/index";

export interface OxigenRateDTO_API {
    nombre: string;
    estado: boolean;
    valor: number;
    medicamentoId: number;
}

export interface OxigenRateAPI {
    id: number;
    nombre: string;
    estado: boolean;
    valor: number;
    medicamento: MedicineAPI;
}

export interface OxigenRateAPI_PAGE extends PaginateAPI {
    content: OxigenRateAPI[];
}
