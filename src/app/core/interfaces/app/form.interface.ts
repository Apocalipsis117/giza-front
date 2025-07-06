import { FormControl } from "@angular/forms";


export type IForm<T> = {
    [K in keyof T]: any;
}

/**
 * FORM control
 */

export type FormGroupTyped<T> = {
  [K in keyof T]: FormControl;
};

export interface FormControlOptionColor extends FormControlOption {
    cssClass: string;
}


export interface FilesOutput {
    base64: string;
    file: any
}

export interface OptionPeopleFormcontrol {
    value: number;
    name: string;
    nid: string | number;
    avatar?: string;
}

export interface FormControlOption<T = any> {
    value: number | '' | string | null;
    name: string;
    data?: T;
}

export interface FormControlOption2<T = any> {
    value: number | '' | string;
    name: string;
    data?: T;
}

export interface DataAssociated {
    uuid?: string | null;
    id?: number | null;
}


export type ActionForm = 'save' | 'reset' | '';
export type InputType = 'number' | 'text' | 'email' | 'tel' | 'date' | 'search' | 'datetime-local' | 'color' | 'time';
export type InputDate = 'date' | 'datetime-local' | 'time';