import { NamedEntityAPP } from "./name-entity.i";

export interface TypeVehicleAPP extends NamedEntityAPP {}

export interface TypeRepresentativeAPP extends NamedEntityAPP {}

export interface TypeHistoryAPP {
    id: number;      // id
    name: string;      // nombre
    withExt: boolean;     // conExt
    minAge: string;      // edadMin
    maxAge: string;      // edadMax
    gender: string;      // pSexo
    pyp: boolean;     // pyp
}

export interface TypeDniIPSAPP {
    id: number;
    name: string;
    prefix: string;
}

export interface TypeRegimeAPP {
    id: number; // id
    initial: string; // inicial
    accountRad: string; // cuentaRad
    accountxRad: string; // cuentaxRad
    name: string; // nnombre
}
