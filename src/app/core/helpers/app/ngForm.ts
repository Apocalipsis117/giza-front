import { WritableSignal } from "@angular/core";
import { AbstractControl } from "@angular/forms";

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
    }
}