import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectAddComponent } from '@im-inputs/input-select-add/input-select-add.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, IForm, InputMaterials_APPDTO } from '@interfaces/index';
import { ClassificationMaterialsService, ManualInputMaterialsService, RipConceptService } from '@services/api';
import { ValidateArrayEmpty, ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-input-materials',
    imports: [
        InputTextComponent,
        InputSelectComponent,
        InputOnoffComponent,
        ReactiveFormsModule,
        InputSelectAddComponent
    ],
    templateUrl: './form-input-materials.component.html'
})
export class FormInputMaterialsComponent {
    private validates = viewChildren('validate');
    RipConcept$ = inject(RipConceptService);
    ClassificationMaterials$ = inject(ClassificationMaterialsService);
    ManualInputMaterials$ = inject(ManualInputMaterialsService);

    optionsRipConceps = signal<FormControlOption[]>([]);
    optionsManualInputMaterials = signal<FormControlOption[]>([]);
    optionsClassificationMaterials = signal<FormControlOption[]>([]);

    fb = inject(FormBuilder);
    form!: FormGroup;

    formClone: InputMaterials_APPDTO;
    formEntity: IForm<InputMaterials_APPDTO> = {
        billable: [false],
        name: ['', [ValidateStringEmpty()]],
        status: [true],
        ripsConceptId: [null, [ValidStrict()]],
        manualInputMaterialsTariffIds: [[] as number[], [ValidateArrayEmpty()]],
        materialClassificationId: [null, [ValidStrict()]]
    }

    constructor() {
        this.form = this.fb.group(this.formEntity);
        this.formClone = ngFormHelper.unboxProperties(this.formEntity)
    }

    get control() {
        return this.form.controls as FormGroupTyped<InputMaterials_APPDTO>;
    }

    ngOnInit(): void {
        this.setOptions();
    }

    setOptions() {
        const obs = forkJoin({
            ripsConcept: this.RipConcept$.list('options'),
            ClassificationMaterials: this.ClassificationMaterials$.list('options'),
            ManualInputMaterials: this.ManualInputMaterials$.list('options')
        });

        obs.subscribe({
            next: (value) => {
                this.optionsRipConceps.set(value.ripsConcept);
                this.optionsClassificationMaterials.set(value.ClassificationMaterials);
                this.optionsManualInputMaterials.set(value.ManualInputMaterials);
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

    setValues(values: InputMaterials_APPDTO) {
        this.form.setValue(values);
    }
}