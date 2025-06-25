import { NamedEntityAPP } from "./name-entity.i";

export interface RIPConceptAPP {
    id: number;
    name: string;
    typeService: NamedEntityAPP | null;
    groupSoat: NamedEntityAPP | null;
}

export interface RIPConceptDTO_APP {
    name: string;
    typeServiceId: number;
    groupSoatId: number;
}