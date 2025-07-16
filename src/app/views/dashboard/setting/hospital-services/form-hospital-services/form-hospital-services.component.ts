import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, HospitalService_APPDTO, IForm } from '@interfaces/index';
import { CostCenterService, TypeAmbitService, TypeGenderService } from '@services/api';
import { ValidateNumberEmpty, ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-hospital-services',
    standalone: true,
    imports: [
        InputTextComponent,
        InputOnoffComponent,
        InputSelectComponent,
        InputNumberComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-hospital-services.component.html'
})
export class FormHospitalServicesComponent {
    private validates = viewChildren('validate');
    private readonly gender$ = inject(TypeGenderService);
    private readonly TypeAmbit$ = inject(TypeAmbitService);
    private readonly CostCenter$ = inject(CostCenterService);
    optionsGender = signal<FormControlOption[]>([]);
    optionsTypeAmbit = signal<FormControlOption[]>([]);
    optionsCostCenter = signal<FormControlOption[]>([]);
    private fb = inject(FormBuilder);

    form!: FormGroup;
    formCLone: HospitalService_APPDTO;
    formAssistance: IForm<HospitalService_APPDTO> = {
        name: ['', [ValidateStringEmpty()]],
        minAge: ['', [ValidateStringEmpty()]],
        maxAge: ['', [ValidateStringEmpty()]],
        status: [true],
        bedCount: [NaN, [ValidateNumberEmpty()]],
        genderId: [null, [ValidStrict()]],
        scopeId: [null, [ValidStrict()]],
        costCenterId: [null, [ValidStrict()]]
    };

    constructor() {
        this.form = this.fb.group(this.formAssistance);
        this.formCLone = ngFormHelper.unboxProperties(this.formAssistance);
    }

    get control() {
        return this.form.controls as FormGroupTyped<HospitalService_APPDTO>;
    }

    ngOnInit(): void {
        const obs = forkJoin({
            gender: this.gender$.options(),
            typeAmbit: this.TypeAmbit$.list('options'),
            costCenter: this.CostCenter$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsGender.set(value.gender);
                this.optionsTypeAmbit.set(value.typeAmbit);
                this.optionsCostCenter.set(value.costCenter);
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
