import { PageAPI, ResponseAPI } from "@interfaces/extend.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface Service_API {
    id:            number;
    nombre:        string;
    estado:        boolean;
    quirofano:     boolean;
    ordenServicio: boolean;
    orden:         string;
    ordenImpl:     string;
}
export interface Service_DTO {
    nombre:        string;
    estado:        boolean;
    quirofano:     boolean;
    ordenServicio: boolean;
    orden:         string;
    ordenImpl:     string;
}

export interface Service_PageResponse extends ResponseAPI<PageAPI<Service_API>> {}
export interface Service_PageAPI extends PageAPI<Service_API> {}
export interface Service_ListResponse extends ResponseAPI<Service_API[]> {}
export interface Service_Response extends ResponseAPI<Service_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface Service_APP {
    id:            number; // id
    name:          string; // nombre
    status:        boolean; // estado
    operatingRoom: boolean; // quirofano
    serviceOrder:  boolean; // ordenServicio
    order:         string; // orden
    orderImpl:     string; // ordenImpl
}

export interface Service_APPDTO {
    name:          string; // nombre
    status:        boolean; // estado
    operatingRoom: boolean; // quirofano
    serviceOrder:  boolean; // ordenServicio
    order:         string; // orden
    orderImpl:     string; // ordenImpl
}

export interface Service_PageAPP extends PageAPI<Service_APP> {}