import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper, utilieHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectSearhComponent } from '@im-inputs/input-select-searh/input-select-searh.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { AdministrativeEntity_APP, AdministrativeEntity_APPDTO, DataAssociated, FormControlOption, FormGroupTyped, IForm } from '@interfaces/index';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { TypeRegimeService } from '@services/api';
import { RxAppGisaService } from '@services/app';
import { ValidateLettersOnly, ValidateNumberEmpty, ValidateStringEmpty } from '@valid-control/index';
import { distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'form-date-entity',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TitleIconSectionComponent,
        InputTextComponent,
        InputSelectComponent,
        InputOnoffComponent,
        InputNumberComponent,
        InputSelectSearhComponent
    ],
    templateUrl: './form-date-entity.component.html'
})
export class FormDateEntityComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly app$ = inject(RxAppGisaService);
    private readonly typeRegime = inject(TypeRegimeService);

    municipalies = signal<FormControlOption<DataAssociated>[]>([]);
    optionsDepartment = signal<FormControlOption[]>([]);
    optionsMunicipalies = signal<FormControlOption[]>([]);
    optionsRegime = signal<FormControlOption[]>([]);

    form: FormGroup;
    formCloneEntity: AdministrativeEntity_APPDTO;
    formEntity: IForm<AdministrativeEntity_APPDTO> = {
        code: [NaN, [ValidateNumberEmpty()]],
        name: ['', [ValidateStringEmpty(), ValidateLettersOnly()]],
        address: ['', [ValidateStringEmpty()]],
        filingAddress: ['', [ValidateStringEmpty()]],
        email: [''],
        electronicBillingEmail: [''],
        phone: [''],
        otherData: [''],
        authorizationLength: [NaN],
        nit: ['', [ValidateStringEmpty()]],
        municipalityId: [null],
        regimeId: [null],
        departmentId: [null],
        requiresAnnex2: [false],
        soat: [false],
        status: [true],
        reportResolution256: [false],
        templateResolution1552: [false]
    }

    constructor() {
        this.form = this.fb.group(this.formEntity);
        this.formCloneEntity = ngFormHelper.unboxProperties(this.formEntity);
    }

    get control() {
        return this.form.controls as FormGroupTyped<AdministrativeEntity_APPDTO>;
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
        this.typeRegime.list('options').subscribe(data => this.optionsRegime.set(data));
        this.watchDepartamentId();
    }

    reset() {
        this.form.reset(this.formCloneEntity);
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

    setValues(data: AdministrativeEntity_APP) {
        const values: AdministrativeEntity_APPDTO = {
            address: data.address,
            authorizationLength: data.authorizationLength,
            code: data.code,
            departmentId: data.department.id,
            electronicBillingEmail: data.electronicBillingEmail,
            email: data.email,
            filingAddress: data.filingAddress,
            municipalityId: data.municipality.id,
            name: data.name,
            nit: data.nit,
            otherData: data.otherData,
            phone: data.phone,
            regimeId: data.regime.id,
            reportResolution256: data.reportResolution256,
            requiresAnnex2: data.requiresAnnex2,
            soat: data.soat,
            status: data.status,
            templateResolution1552: data.templateResolution1552
        }
        this.form.setValue(values);
    }
}
