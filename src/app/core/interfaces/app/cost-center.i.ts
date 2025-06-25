import { PaginateAPI } from "@interfaces/index";
import { NamedEntityAPP } from "./name-entity.i";

export interface CostCenterDTO_APP {
    name: string; // nombre
    accountingAccount: number; // cuentaContable
    status: boolean; // estado
    areaId: number; // área
}

export interface CostCenterAPP {
    id: number; // id
    name: string; // nombre
    accountingAccount: string; // cuentaContable
    status: boolean; // estado
    area: null | NamedEntityAPP; // área
}


export interface CostCenterAPP_PAGE extends PaginateAPI {
    content: CostCenterAPP[];
}