import { NamedEntityAPP, PaginateAPI, RIPConceptAPP } from "@interfaces/index";

export interface CupsDTO_APP {
    code: number; // codigo
    name: string; // nombre
    minAge: number; // edadMin
    maxAge: number; // edadMax
    unique: boolean; // unico
    nonInvasiveProcedure: boolean; // proceIncruento
    points: number; // puntos
    uvr: number; // uvr
    uvt: number; // uvt
    birth: boolean; // parto
    current: boolean; // vigente
    status: boolean; // estado
    genderId: number; // sexoId
    levelId: number; // nivelId
    ripsConceptId: number; // conceptoRipsId
    serviceTypeId: number; // tipoServiciosId
    surgicalGroupId: number; // grupoQxId
    scopeId: number; // ambitoId
    birthTypeId: number; // tipoPartoId
}


export interface CupsAPP {
    id: number;
    code: number;
    name: string;
    minAge: number;
    maxAge: number;
    unique: boolean;
    nonInvasiveProcedure: boolean;
    points: number;
    uvr: number;
    uvt: number;
    birth: boolean;
    current: boolean;
    status: boolean;
    gender: NamedEntityAPP;
    level: NamedEntityAPP;
    ripsConcept: RIPConceptAPP;
    serviceType: any;
    surgicalGroup: NamedEntityAPP;
    scope: NamedEntityAPP;
    birthType: NamedEntityAPP;
}

export interface CupsAPP_PAGE extends PaginateAPI {
    content: CupsAPP[];
}