import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { Diagnosis_APPDTO, FormControlOption, FormGroupTyped, IForm } from '@interfaces/index';
import { BladePanelOptionsComponent } from '@layouts/dashboard/blades/blade-panel-options/blade-panel-options.component';
import { DiagnosisCategoryService, DiagnosisCharterService, DiagnosisSubcategoryService, TypeGenderService } from '@services/api';
import { ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-diagnosis',
    standalone: true,
    imports: [
        InputTextComponent,
        InputOnoffComponent,
        InputSelectComponent,
        BladePanelOptionsComponent,
        // other
        ReactiveFormsModule
    ],
    templateUrl: './form-diagnosis.component.html'
})
export class FormDiagnosisComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly subcategoryDiag$ = inject(DiagnosisSubcategoryService);
    private readonly categoryDiag$ = inject(DiagnosisCategoryService);
    private readonly charterDiag = inject(DiagnosisCharterService);
    private readonly gender$ = inject(TypeGenderService);

    optionsSubcategories = signal<FormControlOption[]>([]);
    optionsCharters = signal<FormControlOption[]>([]);
    optionsCategories = signal<FormControlOption[]>([]);
    optionsGenders = signal<FormControlOption[]>([]);

    form: FormGroup;
    formCloneEntity: Diagnosis_APPDTO;
    formEntity: IForm<Diagnosis_APPDTO> = {
        code: [''],
        name: ['', [ValidateStringEmpty()]],
        notify: [false],
        procedure: [false],
        hospitalization: [false],
        common: [false],
        active: [false],
        minAge: ['', [ValidateStringEmpty()]],
        maxAge: ['', [ValidateStringEmpty()]],
        genderId: [null, [ValidStrict()]],
        chapterId: [null, [ValidStrict()]],
        categoryId: [null, [ValidStrict()]],
        subCategoryId: [null, [ValidStrict()]]
    }

    ngOnInit(): void {
        const obs = forkJoin({
            subcategories: this.subcategoryDiag$.list('options'),
            charters: this.charterDiag.list('options'),
            categories: this.categoryDiag$.list('options'),
            genders: this.gender$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsSubcategories.set(value.subcategories);
                this.optionsCharters.set(value.charters);
                this.optionsCategories.set(value.categories);
                this.optionsGenders.set(value.genders);
            }
        });
    }

    constructor() {
        this.form = this.fb.group(this.formEntity);
        this.formCloneEntity = ngFormHelper.unboxProperties(this.formEntity);
    }

    get control() {
        return this.form.controls as FormGroupTyped<Diagnosis_APPDTO>;
    }

    reset() {
        this.form.reset(this.formCloneEntity);
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

    setValues(values: Diagnosis_APPDTO) {
        this.form.setValue(values);
    }
}
