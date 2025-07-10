import { WritableSignal } from "@angular/core";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export const ngFormHelper = {
    unboxProperties<T extends Record<string, any[]>>(obj: T): { [K in keyof T]: T[K][0] } {
        const result: { [K in keyof T]?: T[K][0] } = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key][0];
            }
        }

        return result as { [K in keyof T]: T[K][0] };
    },
    /**
     * Valida un control de formulario y actualiza un signal con el mensaje de error, si corresponde.
     *
     * @param control - Referencia al AbstractControl.
     * @param errorSignal - Signal donde se guarda el mensaje de error.
     * @param key - Clave del error a mostrar (por defecto 'message').
     */
    validate(control: AbstractControl | null | undefined, errorSignal: WritableSignal<string | null>, key = 'message') {
        queueMicrotask(() => {
            if (!control) return;

            control.updateValueAndValidity({ onlySelf: true, emitEvent: false });

            if (!control.touched) return;

            const error = control.errors?.[key] || null;
            errorSignal.set(error);
        });
    },
    isControlsValid<T>(formGroup: FormGroup<any>, keys: (keyof T)[]): boolean {
        for (const key of keys) {
            const control = formGroup.get(key as string);
            if (!control || control.invalid) {
                return false;
            }
        }
        return true;
    },
    canAddNewFormArrayItem(formArray: FormArray, requiredFields: string[]): boolean {
        if (formArray.length === 0) return true;

        const lastGroup = formArray.at(formArray.length - 1);
        if (!lastGroup) return true;

        return requiredFields.every((field) => {
            const control = lastGroup.get(field);
            const value = control?.value;

            const isEmpty =
                control?.invalid ||
                value === null ||
                value === undefined ||
                (typeof value === 'string' && value.trim() === '');

            if (isEmpty) control?.markAsTouched();

            return !isEmpty;
        });
    }
}