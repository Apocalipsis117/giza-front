import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputSelectAddComponent } from '@im-inputs/input-select-add/input-select-add.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { DiagnosisGroup_APPDTO, FormControlOption2, FormGroupTyped, IForm } from '@interfaces/index';
import { DiagnosisService } from '@services/api';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-diagnosis-group',
    standalone: true,
    imports: [
        InputTextComponent,
        InputSelectAddComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-diagnosis-group.component.html'
})
export class FormDiagnosisGroupComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly Diagnosis$ = inject(DiagnosisService);
    optionsDiagnosis = signal<FormControlOption2[]>([]);

    form: FormGroup;
    formClone: DiagnosisGroup_APPDTO;
    formValues: IForm<DiagnosisGroup_APPDTO> = {
        diagnosisIds: [[] as string[]],
        name: ['']
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<DiagnosisGroup_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        const obs = forkJoin({
            diagnosis: this.Diagnosis$.list('options2'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsDiagnosis.set(value.diagnosis);
            }
        });
    }

    reset() {
        this.form.reset(this.formClone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }

    setValues(values: DiagnosisGroup_APPDTO) {
        this.form.setValue(values);
    }
}
