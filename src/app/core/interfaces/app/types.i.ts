import { NamedEntityAPP } from "./name-entity.i";

export interface TypeVehicleAPP extends NamedEntityAPP {}

export interface TypeRepresentativeAPP extends NamedEntityAPP {}

export interface TypeDniIPSAPP {
    id: number;
    name: string;
    prefix: string;
}