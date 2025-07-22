import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { InputTextareaComponent } from '@im-inputs/input-textarea/input-textarea.component';
import { FormControlOption, FormGroupTyped, IForm, Vehicle_APP, Vehicle_APPDTO } from '@interfaces/index';
import { ActivityService, TypeVehicleService } from '@services/api';
import { ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-vehicles',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextareaComponent,
        InputTextComponent,
        InputOnoffComponent,
        InputSelectComponent
    ],
    templateUrl: './form-vehicles.component.html'
})
export class FormVehiclesComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly typeVehicle$ = inject(TypeVehicleService);
    private readonly activity$ = inject(ActivityService);

    optionsTypevehicles = signal<FormControlOption[]>([]);
    optionsBrandsvehicles = signal<FormControlOption[]>([]);
    optionsActivity = signal<FormControlOption[]>([]);

    form: FormGroup;
    formClone: Vehicle_APPDTO;
    formValues: IForm<Vehicle_APPDTO> = {
        activityId: [null, [ValidStrict()]],
        brand: ['', [ValidateStringEmpty()]],
        description: [''],
        model: ['', [ValidateStringEmpty()]],
        status: [true],
        vehicleTypeId: [null, [ValidStrict()]],
        plate: ['', [ValidateStringEmpty()]]
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<Vehicle_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        const obs = forkJoin({
            typeVehicle: this.typeVehicle$.list('options'),
            activity: this.activity$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsTypevehicles.set(value.typeVehicle);
                this.optionsActivity.set(value.activity);
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

    setValues(data: Vehicle_APP | null) {
        if(data) {
            const values: Vehicle_APPDTO = {
                activityId: data.activity.id,
                brand: data.brand,
                description: data.description,
                model: data.model,
                plate: data.plate,
                status: data.status,
                vehicleTypeId: data.vehicleType.id
            }
            this.form.patchValue(values)
        }
    }
}
