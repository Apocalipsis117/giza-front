import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Apartment_API, Apartment_APP, Municipality_API, Municipality_APP } from "./apartment-cities.i";
import { TypeZona_API, TypeZona_APP } from "./type-zona.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre:          string;
}

export interface Neighborhood_DTO extends Base_API {
    departamentosId: number;
    municipioId:     number;
    zonaId:          number;
}

export interface Neighborhood_API extends Base_API {
    id: number;
    departamentos: Apartment_API;
    municipio:     Municipality_API;
    zona:        TypeZona_API;
}

export interface Neighborhood_PageResponse extends ResponseAPI<PageAPI<Neighborhood_API>> {}
export interface Neighborhood_PageAPI extends PageAPI<Neighborhood_API> {}
export interface Neighborhood_ListResponse extends ResponseAPI<Neighborhood_API[]> {}
export interface Neighborhood_Response extends ResponseAPI<Neighborhood_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    name:          string; // nombre
}

export interface Neighborhood_APPDTO extends Base_APP {
    apartmentsId: number; // departamentosId
    municipalityId: number; // municipioId
    zoneId: number; // zonaId
}

export interface Neighborhood_APP extends Base_APP {
    id: number;
    apartments: Apartment_APP; // departamentos
    municipality: Municipality_APP; // municipio
    zone: TypeZona_APP; // zonaId
}

export interface Neighborhood_PageAPP extends PageAPI<Neighborhood_APP> {}