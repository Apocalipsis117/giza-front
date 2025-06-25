import { NamedEntityAPP, PaginateAPI } from "@interfaces/index";

export interface DiagnosisDTO_APP {
    code: string; // codigo
    name: string; // nombre
    minAge: string; // edadMin
    maxAge: string; // edadMax
    notify: boolean; // notificar
    procedure: boolean; // procedimiento
    hospitalization: boolean; // hospitalizacion
    common: boolean; // comun
    active: boolean; // vigente
    genderId: number; // sexoId
    diagnosisChapterId: number; // capitulosDiagId
    diagnosisCategoryId: number; // categoriasDiagId
    diagnosisSubcategoryId: number; // subCategoriasDiagId
}

export interface DiagnosisCharterAPP {
    id: number; // id
    name: string; // nombre
    range: string; // rango
}

export interface DiagnosisCategoryAPP {
    id: number; // id
    name: string; // nombre
    range: string; // rango
    diagnosisChapter: DiagnosisCharterAPP; // capitulosDiag
}

export interface DiagnosisAPP {
    id: number; // id
    code: string; // codigo
    name: string; // nombre
    minAge: string; // edadMin
    maxAge: string; // edadMax
    notify: boolean; // notificar
    procedure: boolean; // procedimiento
    hospitalization: boolean; // hospitalizacion
    common: boolean; // comun
    active: boolean; // vigente
    gender: NamedEntityAPP; // sexo
    diagnosisChapter: DiagnosisCharterAPP; // capitulosDiag
    diagnosisCategory: DiagnosisCategoryAPP; // categoriasDiag
    subDiagnosisCategory: null | any; // subCategoriasDiag
}

export interface DiagnosisAPP_PAGE extends PaginateAPI {
    content: DiagnosisAPP[];
}