import { NamedEntityAPI } from "./name-entity.i";

export interface RIPConceptAPI {
    id: number;
    nombre: string;
    tipoServicio: NamedEntityAPI;
    grupoSoat: NamedEntityAPI;
}

export interface RIPConceptDTO_API {
    nombre: string;
    tipoServicioId: number;
    grupoSoatId: number;
}