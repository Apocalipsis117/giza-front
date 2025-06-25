import { NamedEntityAPI, PaginateAPI } from "@interfaces/index";

export interface CostCenterDTO_API {
    nombre: string;
    cuentaContable: number;
    estado: boolean;
    areaId: number;
}

export interface CostCenterAPI {
    id: number;
    nombre: string;
    cuentaContable: string;
    estado: boolean;
    area: null | NamedEntityAPI;
}

export interface CostCenterAPI_PAGE extends PaginateAPI {
    content: CostCenterAPI[];
}
