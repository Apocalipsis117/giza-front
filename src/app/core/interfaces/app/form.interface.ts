import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";


export type IForm<T> = {
  [K in keyof T]: [(T[K] | null | '' | []), ValidatorFn[]?] | AbstractControl;
};

export type FormGroupTyped<T> = {
  [K in keyof T]: FormControl;
};

export type FormControlValue = number | '' | string | null;

export interface FormControlOption<T = any> {
    value: FormControlValue;
    name: string;
    data?: T;
}

export interface FormControlImagen {
    name: string;
    formate: string;
    size: number;
    file: any;
}

export interface FormControlOptionColor extends FormControlOption {
    cssClass: string;
}

export interface FilesOutput {
    base64: string;
    file: any;
}

export interface OptionPeopleFormcontrol {
    value: number;
    name: string;
    nid: string | number;
    avatar?: string;
}

export interface DataAssociated {
    uuid?: string | null;
    id?: number | null;
}

export type FormControlEncode = 'base64' | 'btoa' | 'file';
export type ActionForm = 'save' | 'reset' | '';
export type InputType = 'number' | 'text' | 'email' | 'tel' | 'date' | 'search' | 'datetime-local' | 'color' | 'time';
export type InputDate = 'date' | 'datetime-local' | 'time';