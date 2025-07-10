import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateArrayEmpty(text: string = ''): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const tagsArray = control.value as (number | string)[];
        const message = text ? text : 'No cuenta con valores en la lista';
        return tagsArray.length > 0 ? null : { message };
    };
}

export function ValidateNumberEmpty(message = 'Campo requerido'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return !Number.isNaN(value) ? null : { message };
    };
}

export function ValidateLettersOnly(message = 'Solo letras permitidas'): ValidatorFn {
    const lettersRegex = /^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return (typeof value === 'string' && lettersRegex.test(value)) ? null : { message };
    };
}

export function ValidateParagraphText(message = 'Caracteres no permitidos en el texto'): ValidatorFn {
    // Incluye letras, espacios, acentos, ñ, puntuación básica, saltos de línea y comas
    const paragraphRegex = /^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ0-9\s,.;:¡!¿?"'’()\-—–…]+$/m;
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return (typeof value === 'string' && paragraphRegex.test(value))
            ? null
            : { message };
    };
}

export function ValidateStringEmpty(message = 'Campo requerido'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return (typeof value === 'string' && value.trim().length > 0) ? null : { message };
    };
}

export function ValidateEmail(message = 'Email no válido'): ValidatorFn {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return (typeof value === 'string' && emailRegex.test(value)) ? null : { message };
    };
}


export function ValidNumberLength(expectedLength: number, message?: string): ValidatorFn {
    const defaultMsg = `Debe contener ${expectedLength} numéricos`;

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value == null || value === '') return null;
        const onlyDigits = String(value).replace(/\D/g, '');
        return (onlyDigits.length !== expectedLength) ? { message: message || defaultMsg } : null;
    };
}


export function ValidStrict(message?: string): ValidatorFn {
    const defaultMsg = 'Este campo es obligatorio';

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        const isEmpty = value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value));

        return isEmpty ? { message: message || defaultMsg } : null;
    };
}

export function ValidateMaxNumber(max: number, message?: string): ValidatorFn {
    const defaultMsg = `El valor debe ser menor o igual a ${max}`;
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (Number.isNaN(value)) return null;
        return value <= max ? null : { message: message || defaultMsg };
    };
}

export function validateMaxDigits(maxDigits: number, message?: string): ValidatorFn {
    const defaultMsg = `Debe tener como máximo ${maxDigits} dígito(s) numérico(s)`;
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (value == null || value === '') return null;

        // Aceptamos solo dígitos (ignora símbolos como puntos, comas o letras)
        const numericPart = String(value).replace(/\D/g, '');

        return numericPart.length <= maxDigits
            ? null
            : { message: message || defaultMsg };
    };
}