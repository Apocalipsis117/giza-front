import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper, utilieHelper } from '@helpers/index';
import { InputSelectSearhComponent } from '@im-inputs/input-select-searh/input-select-searh.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { DataAssociated, FormControlOption, FormGroupTyped, IForm, Institutions_APPDTO } from '@interfaces/index';
import { ApartmentCitiesService, LegalNatureService, LevelComplexityService, TypeReferralService } from '@services/api';
import { RxAppGisaService } from '@services/app';
import { ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { distinctUntilChanged, forkJoin } from 'rxjs';

@Component({
    selector: 'form-institutions',
    standalone: true,
    templateUrl: './form-institutions.component.html',
    imports: [
        InputTextComponent,
        InputSelectComponent,
        InputSelectSearhComponent,
        ReactiveFormsModule
    ]
})
export class FormInstitutionsComponent {
    private validates = viewChildren('validate');
    private readonly app$ = inject(RxAppGisaService);
    LegalNature$ = inject(LegalNatureService);
    TypeReferral$ = inject(TypeReferralService);
    LevelComplexity$ = inject(LevelComplexityService);

    optionsLegalNature = signal<FormControlOption[]>([]);
    optionsTypeReferral = signal<FormControlOption[]>([]);
    optionsLevelComplexity = signal<FormControlOption[]>([]);
    // location
    optionsDepartment = signal<FormControlOption[]>([]);
    optionsMunicipalies = signal<FormControlOption[]>([]);
    municipalies = signal<FormControlOption<DataAssociated>[]>([]);

    fb = inject(FormBuilder);
    form!: FormGroup;

    formClone: Institutions_APPDTO;
    formEntity: IForm<Institutions_APPDTO> = {
        address: [''],
        email: [''],
        name: ['', [ValidateStringEmpty()]],
        phone: [''],
        roomCode: ['', [ValidateStringEmpty()]],
        departmentId: [null, [ValidStrict()]],
        complexityLevelId: [null, [ValidStrict()]],
        legalNatureId: [null, [ValidStrict()]],
        municipalityId: [null, [ValidStrict()]],
        referralTypeId: [null, [ValidStrict()]]
    }

    constructor() {
        this.form = this.fb.group(this.formEntity);
        this.formClone = ngFormHelper.unboxProperties(this.formEntity)
    }

    get control() {
        return this.form.controls as FormGroupTyped<Institutions_APPDTO>;
    }

    ngOnInit(): void {
        this.app$.watchCountries.subscribe({
            next: (value) => {
                const depart = utilieHelper.cloneValue(value.apartaments);
                const cities = utilieHelper.cloneValue(value.minicipalies);
                this.optionsDepartment.set(depart);
                this.municipalies.set(cities);
            }
        });
        this.watchDepartamentId();
        this.setOptions();
    }

    setOptions() {
        const obs = forkJoin({
            legalNature: this.LegalNature$.list('options'),
            typeReferral: this.TypeReferral$.list('options'),
            levelComplexity: this.LevelComplexity$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsLegalNature.set(value.legalNature);
                this.optionsTypeReferral.set(value.typeReferral);
                this.optionsLevelComplexity.set(value.levelComplexity);
            }
        });
    }

    reset() {
        this.form.reset(this.formClone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    watchDepartamentId() {
        this.form.get('departmentId')!.valueChanges.pipe(distinctUntilChanged()).subscribe({
            next: (value) => {
                this.control['municipalityId'].patchValue(null);
                const municipalies = this.municipalies();
                const asociated = municipalies.filter(x => x.data?.id === value);
                this.optionsMunicipalies.set(asociated);
            }
        })
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }

    setValues(values: Institutions_APPDTO) {
        this.form.setValue(values);
    }
}
