import { inject, Injectable } from '@angular/core';
import { SweetalertService } from './sweetalert.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface BaseFormComponent<T = any> {
    form: FormGroup;
    reset: () => void;
    markAllTouched: () => void;
    setValues?: (values: T) => void;
    [key: string]: any; // permite acceso a otros métodos o propiedades personalizadas
}

@Injectable({
    providedIn: 'root'
})
export class EntityFormHelperService {
    private readonly swal$ = inject(SweetalertService);

    canGoOut(form: FormGroup): Promise<boolean> | boolean {
        return this.swal$.canOutup(form?.dirty);
    }

    save<T>(formCompoent: any, saveFn: (value: T) => Observable<any> ,options: {
        localEmit:  (value: any | null) => void;
        onSuccess?: (value: any) => void,
        onError?: () => void,
        afterSave?: () => void
    }) {
        const form = formCompoent.form;
        if (form?.valid) {
            this.swal$.loading();
            saveFn(form.value).subscribe({
                next: (value: any) => {
                    options.localEmit(value);
                    options.afterSave?.();
                },
                complete: () => {
                    this.swal$.formSave('success');
                    formCompoent.reset();
                    options.afterSave?.();
                },
                error: () => {
                    this.swal$.formSave('error');
                    options.onError?.();
                }
            })
        } else {
            this.swal$.formSave('warning');
            formCompoent?.markAlltouched();
        }
    }
}
