import { NamedEntityAPI, PaginateAPI, RIPConceptAPI } from "@interfaces/index";

export interface CupsDTO_API {
    codigo: number;
    nombre: string;
    edadMin: number;
    edadMax: number;
    unico: boolean;
    proceIncruento: boolean;
    puntos: number;
    uvr: number;
    uvt: number;
    parto: boolean;
    vigente: boolean;
    estado: boolean;
    sexoId: number;
    nivelId: number;
    conceptoRipsId: number;
    tipoServiciosId: number;
    grupoQxId: number;
    ambitoId: number;
    tipoPartoId: number;
}

export interface CupsAPI {
    id: number;
    codigo: number;
    nombre: string;
    edadMin: number;
    edadMax: number;
    unico: boolean;
    proceIncruento: boolean;
    puntos: number;
    uvr: number;
    uvt: number;
    parto: boolean;
    vigente: boolean;
    estado: boolean;
    sexo: NamedEntityAPI;
    nivel: NamedEntityAPI;
    conceptoRips: RIPConceptAPI;
    tipoServicios: any;
    grupoQx: NamedEntityAPI;
    ambito: NamedEntityAPI;
    tipoParto: NamedEntityAPI;
}

export interface CupsAPI_PAGE extends PaginateAPI {
    content: CupsAPI[];
}
