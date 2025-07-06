/**
 * Name state
 */

import { PageAPI, ResponseAPI } from "@interfaces/extend.i";

export interface NameStateEntity_API {
    id: number;
    nombre: string;
    estado: boolean;
}
export interface NameStateEntity_DTO {
    nombre: string;
    estado: boolean;
}

export interface NameStateEntity_PageResponse extends ResponseAPI<PageAPI<NameStateEntity_API>> {}
export interface NameStateEntity_PageAPI extends PageAPI<NameStateEntity_API> {}
export interface NameStateEntity_ListResponse extends ResponseAPI<NameStateEntity_API[]> {}
export interface NameStateEntity_Response extends ResponseAPI<NameStateEntity_API> {}

export interface NameStateEntity_APP {
    id: number;
    name: string;
    state: boolean;
}
export interface NameStateEntity_APPDTO {
    name: string;
    state: boolean;
}

export interface NameStateEntity_PageAPP extends PageAPI<NameStateEntity_APP> {}