

/**
 * Name UUID
 */

import { PageAPI, ResponseAPI } from "@interfaces/extend.i";

export interface NameUUIDEntity_API {
    uuid: number;
    nombre: string;
}

export interface NameUUIDEntity_DTO {
    nombre: string;
}

export interface NameUUIDEntity_PageResponse extends ResponseAPI<PageAPI<NameUUIDEntity_API>> {}
export interface NameUUIDEntity_PageAPI extends PageAPI<NameUUIDEntity_API> {}
export interface NameUUIDEntity_ListResponse extends ResponseAPI<NameUUIDEntity_API[]> {}
export interface NameUUIDEntity_Response extends ResponseAPI<NameUUIDEntity_API> {}

export interface NameUUIDEntity_APP {
    uuid: number;
    name: string;
}

export interface NameUUIDEntity_APPDTO {
    name: string;
}

export interface NameUUIDEntity_PageAPP extends PageAPI<NameUUIDEntity_APP> {}