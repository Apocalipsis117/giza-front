import { PageAPI, ResponseAPI, ResponsePAGE_API } from "@interfaces/extend.i";
import { Gender_API, Gender_APP } from "@interfaces/index";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    codigo:              string;
    nombre:              string;
    notificar:           boolean;
    procedimiento:       boolean;
    hospitalizacion:     boolean;
    comun:               boolean;
    vigente:             boolean;
    edadMin:             string;
    edadMax:             string;
}

export interface Diagnosis_DTO extends Base_API {
    sexoId:              number;
    capitulosDiagId:     number;
    categoriasDiagId:    number;
    subCategoriasDiagId: number;
}

export interface Diagnosis_API extends Base_API {
    id:                number;
    sexo:              Gender_API;
    capitulosDiag:     SDiag_API;
    categoriasDiag:    SDiag_API;
    subCategoriasDiag: SDiag_API;
}

export interface SDiag_API {
    id:              number;
    nombre:          string;
    rango:           string;
    capitulosDiag?:  SDiag_API | null;
    categoriasDiag?: SDiag_API | null;
}

export interface Diagnosis_PageResponse extends ResponsePAGE_API<Diagnosis_API> {}
export interface Diagnosis_PageAPI extends PageAPI<Diagnosis_API> {}
export interface Diagnosis_ListResponse extends ResponseAPI<Diagnosis_API[]> {}
export interface Diagnosis_Response extends ResponseAPI<Diagnosis_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    code: string;                // codigo
    name: string;                // nombre
    notify: boolean;             // notificar
    procedure: boolean;          // procedimiento
    hospitalization: boolean;    // hospitalizacion
    common: boolean;             // comun
    active: boolean;             // vigente
    minAge: string;              // edadMin
    maxAge: string;              // edadMax
}

export interface Diagnosis_APPDTO extends Base_APP {
    genderId: number;                // sexoId
    chapterId: number;               // capitulosDiagId
    categoryId: number;              // categoriasDiagId
    subCategoryId: number;           // subCategoriasDiagId
}

export interface Diagnosis_APP extends Base_APP {
    id: number;                      // id
    gender: Gender_APP;              // sexo
    chapter: SDiag_APP;              // capitulosDiag
    category: SDiag_APP;             // categoriasDiag
    subCategory: SDiag_APP;          // subCategoriasDiag
}

export interface SDiag_APP {
    id: number;                      // id
    name: string;                    // nombre
    range: string;                   // rango
    chapter?: SDiag_APP | null;             // capitulosDiag
    category?: SDiag_APP | null;            // categoriasDiag
}

export interface Diagnosis_PageAPP extends PageAPI<Diagnosis_APP> {}