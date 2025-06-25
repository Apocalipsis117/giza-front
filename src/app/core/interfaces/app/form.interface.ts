export interface OptionsForm {
    value: number | '' | string;
    name: string;
    data?: any;
}

export interface FormControlOptionColor extends OptionsForm {
    cssClass: string;
}


export interface FilesOutput {
    base64: string;
    file: any
}

export type InputType = 'number' | 'text' | 'email' | 'tel' | 'date' | 'search' | 'datetime-local' | 'color' | 'time';

export type InputDate = 'date' | 'datetime-local' | 'time';

export interface OptionPeopleFormcontrol {
    value: number;
    name: string;
    nid: string | number;
    avatar?: string;
}

export type IForm<T> = {
    [K in keyof T]: any;
}


export type ActionForm = 'save' | 'reset' | '';