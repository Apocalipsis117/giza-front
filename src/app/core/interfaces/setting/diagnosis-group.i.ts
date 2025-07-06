import { PageAPI, ResponseAPI } from "@interfaces/extend.i";
import { Diagnosis_API, Diagnosis_APP } from "./diagnosis.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
interface Base_API {
    nombre: string;
}

export interface DiagnosisGroup_DTO extends Base_API {
    diagnosticosIds: number[];
}

export interface DiagnosisGroup_API extends Base_API {
    id : number;
    diagnosticos: Diagnosis_API[];
}

export interface DiagnosisGroup_PageResponse extends ResponseAPI<PageAPI<DiagnosisGroup_API>> {}
export interface DiagnosisGroup_PageAPI extends PageAPI<DiagnosisGroup_API> {}
export interface DiagnosisGroup_ListResponse extends ResponseAPI<DiagnosisGroup_API[]> {}
export interface DiagnosisGroup_Response extends ResponseAPI<DiagnosisGroup_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
interface Base_APP {
    name: string;
}

export interface DiagnosisGroup_APPDTO extends Base_APP {
    diagnosisIds: number[];
}

export interface DiagnosisGroup_APP extends Base_APP {
    id : number;
    diagnoses: Diagnosis_APP[];
}

export interface DiagnosisGroup_PageAPP extends PageAPI<DiagnosisGroup_APP> {}