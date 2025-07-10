import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputSelectSearhComponent } from '@im-inputs/input-select-searh/input-select-searh.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, IForm, OxygenRate_APPDTO } from '@interfaces/index';
import { MedicineService } from '@services/api';
import { ValidateNumberEmpty, ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-oxygen-rate',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextComponent,
        InputSelectSearhComponent
    ],
    templateUrl: './form-oxygen-rate.component.html'
})
export class FormOxygenRateComponent {
    private validates = viewChildren('validate');
    private readonly Medicine$ = inject(MedicineService);
    optionsMedicine = signal<FormControlOption[]>([]);
    private fb = inject(FormBuilder);

    form!: FormGroup;
    formCLone: OxygenRate_APPDTO;
    formValues: IForm<OxygenRate_APPDTO> = {
        medicineId: [null, [ValidStrict()]],
        name: ['', [ValidateStringEmpty()]],
        status: [true],
        value: [NaN, [ValidateNumberEmpty()]]
    };

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formCLone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<OxygenRate_APPDTO>;
    }

    ngOnInit(): void {
        const obs = forkJoin({
            medicine: this.Medicine$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsMedicine.set(value.medicine);
            }
        });
    }

    reset() {
        this.form.reset(this.formCLone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }
}
