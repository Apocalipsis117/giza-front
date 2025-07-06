/**
 * Name ID
 */

import { PageAPI, ResponseAPI } from "@interfaces/extend.i";

export interface NameIdEntity_API {
    id: number;
    nombre: string;
}

export interface NameIdEntity_DTO {
    nombre: string;
}

export interface NameIdEntity_PageResponse extends ResponseAPI<PageAPI<NameIdEntity_API>> {}
export interface NameIdEntity_PageAPI extends PageAPI<NameIdEntity_API> {}
export interface NameIdEntity_ListResponse extends ResponseAPI<NameIdEntity_API[]> {}
export interface NameIdEntity_Response extends ResponseAPI<NameIdEntity_API> {}

export interface NameIdEntity_APP {
    id: number;
    name: string;
}

export interface NameIdEntity_APPDTO {
    name: string;
}

export interface NameIdEntity_PageAPP extends PageAPI<NameIdEntity_APP> {}