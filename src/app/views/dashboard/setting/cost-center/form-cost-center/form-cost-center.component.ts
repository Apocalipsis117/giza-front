import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { CostCenter_APPDTO, FormControlOption, FormGroupTyped, IForm } from '@interfaces/index';
import { TypeAreaService } from '@services/api';
import { ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-cost-center',
    standalone: true,
    imports: [
        InputTextComponent,
        InputOnoffComponent,
        InputSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-cost-center.component.html'
})
export class FormCostCenterComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly typeArea$ = inject(TypeAreaService);
    optionsArea = signal<FormControlOption[]>([]);

    form: FormGroup;
    formClone: CostCenter_APPDTO;
    formValues: IForm<CostCenter_APPDTO> = {
        name: ['', [ValidateStringEmpty()]],
        accountingAccount: ['', [ValidateStringEmpty()]],
        status: [true],
        areaId: [null, [ValidStrict()]]
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<CostCenter_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        const obs = forkJoin({
            typeArea: this.typeArea$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsArea.set(value.typeArea);
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

    setValues(values: CostCenter_APPDTO) {
        this.form.setValue(values);
    }
}
