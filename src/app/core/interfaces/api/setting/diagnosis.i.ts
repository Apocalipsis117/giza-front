import { NamedEntityAPI, PaginateAPI } from "@interfaces/index";

export interface DiagnosisDTO_API {
    codigo: string;
    nombre: string;
    edadMin: string;
    edadMax: string;
    notificar: boolean;
    procedimiento: boolean;
    hospitalizacion: boolean;
    comun: boolean;
    vigente: boolean;
    sexoId: number;
    capitulosDiagId: number;
    categoriasDiagId: number;
    subCategoriasDiagId: number;
}

export interface DiagnosisAPI {
    id: number;
    codigo: string;
    nombre: string;
    edadMin: string;
    edadMax: string;
    notificar: boolean;
    procedimiento: boolean;
    hospitalizacion: boolean;
    comun: boolean;
    vigente: boolean;
    sexo: NamedEntityAPI;
    capitulosDiag: DiagnosisCharterAPI;
    categoriasDiag: DiagnosisCategoryAPI;
    subCategoriasDiag: null | any;
}

export interface DiagnosisCharterAPI {
    id: number;
    nombre: string;
    rango: string;
}

export interface DiagnosisCategoryAPI {
    id: number;
    nombre: string;
    rango: string;
    capitulosDiag: DiagnosisCharterAPI;
}


export interface DiagnosisAPI_PAGE extends PaginateAPI {
    content: DiagnosisAPI[];
}