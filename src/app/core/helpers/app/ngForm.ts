import { WritableSignal } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { FormControlValue } from "@interfaces/index";

export const ngFormHelper = {
    unboxProperties<T extends Record<string, any>>(obj: T): any {
        const result: any = {};
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            const val = obj[key] as any;
            if (val instanceof FormControl || val instanceof FormGroup || val instanceof FormArray) {
                result[key] = val.value;
            }
            else if (Array.isArray(val)) {
                result[key] = val[0];
            }
            else {
                result[key] = val;
            }
        }
        return result;
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

            const isEmpty = control?.invalid || value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

            if (isEmpty) control?.markAsTouched();

            return !isEmpty;
        });
    },
    lastControlIsValid(formArray: FormArray): boolean {
        if (formArray.length === 0) return true;

        const lastGroup = formArray.at(formArray.length - 1);
        if (!lastGroup || !(lastGroup instanceof FormGroup)) return true;

        lastGroup.markAllAsTouched();
        return lastGroup.valid;
    },
    setValidate(control: AbstractControl, fnValid: ValidatorFn[], value: FormControlValue = null) {
        if (!control) {
            console.warn(`Control no encontrado`);
            return;
        }
        if(value) {
            control.setValue(value)
        }
        control.clearValidators();
        control.setValidators(fnValid);
        control.updateValueAndValidity();
    }
}