import { PageAPI, ResponseAPI } from "@interfaces/extend.i";

/**
 * ---------------------------
 * API
 * ---------------------------
 */
export interface InputMaterialsManual_API {}
export interface InputMaterialsManual_DTO {}

export interface InputMaterialsManual_PageResponse extends ResponseAPI<PageAPI<InputMaterialsManual_API>> {}
export interface InputMaterialsManual_PageAPI extends PageAPI<InputMaterialsManual_API> {}
export interface InputMaterialsManual_ListResponse extends ResponseAPI<InputMaterialsManual_API[]> {}
export interface InputMaterialsManual_Response extends ResponseAPI<InputMaterialsManual_API> {}

/**
 * ---------------------------
 * APP
 * ---------------------------
 */
export interface InputMaterialsManual_APP {}
export interface InputMaterialsManual_APPDTO {}

export interface InputMaterialsManual_PageAPP extends PageAPI<InputMaterialsManual_APP> {}