/**
 * API
 */

import { NamedEntityAPP } from "@interfaces/index";
import { NamedEntityAPI } from "../name-entity.i";

export interface HospitalServiceDTO_API {
    nombre: string;
    edadMin: string;
    edadMax: string;
    estado: boolean;
    numCamas: number;
    sexoId: number;
    ambitoId: number;
    centroCostoId: number;
}

export interface HospitalServiceAPI {
    id: number;
    nombre: string;
    edadMin: string;
    edadMax: string;
    estado: boolean;
    numCamas: number;
    sexo: NamedEntityAPI;
    ambito: NamedEntityAPI;
    centroCosto: any;
}


/**
 * APP
 */

export interface HospitalServiceDTO_APP {
    name: string; // nombre
    minAge: string; // edadMin
    maxAge: string; // edadMax
    isActive: boolean; // estado
    bedCount: number; // numCamas
    genderId: number; // sexoId
    scopeId: number; // ambitoId
    costCenterId: number; // centroCostoId
}

export interface HospitalServiceAPP {
    id: number; // id
    name: string; // nombre
    minAge: string; // edadMin
    maxAge: string; // edadMax
    isActive: boolean; // estado
    bedCount: number; // numCamas
    gender: NamedEntityAPP; // sexo
    scope: NamedEntityAPP; // ambito
    costCenter: any; // centroCosto
}