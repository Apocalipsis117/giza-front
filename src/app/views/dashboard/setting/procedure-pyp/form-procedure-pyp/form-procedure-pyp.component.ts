import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, IForm, ProcedurePyp_APPDTO } from '@interfaces/index';
import { TypeServicePypService } from '@services/api';
import { ValidateStringEmpty, ValidStrict } from '@valid-control/index';

@Component({
    selector: 'form-procedure-pyp',
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputSelectComponent
    ],
    templateUrl: './form-procedure-pyp.component.html'
})
export class FormProcedurePypComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly TypeServicePyp$ = inject(TypeServicePypService);

    optionsTypeServicePyp = signal<FormControlOption[]>([]);

    form: FormGroup;
    formClone: ProcedurePyp_APPDTO;
    formValues: IForm<ProcedurePyp_APPDTO> = {
        code: [''],
        name: ['', [ValidateStringEmpty()]],
        pypServiceTypeId: [null, [ValidStrict()]]
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<ProcedurePyp_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        this.TypeServicePyp$.list('options').subscribe({
            next: (value) => {
                this.optionsTypeServicePyp.set(value);
            }
        })
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

    setValues(values: ProcedurePyp_APPDTO) {
        this.form.setValue(values);
    }
}
