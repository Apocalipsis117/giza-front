import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper, utilieHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectSearhComponent } from '@im-inputs/input-select-searh/input-select-searh.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { AdministrativeEntity_APPDTO, DataAssociated, FormControlOption, FormGroupTyped, IForm } from '@interfaces/index';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { TypeRegimeService } from '@services/api';
import { RxAppGisaService } from '@services/app';
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
    private readonly fb = inject(FormBuilder);
    private readonly app$ = inject(RxAppGisaService);
    private readonly typeRegime = inject(TypeRegimeService);

    municipalies = signal<FormControlOption<DataAssociated>[]>([]);
    resolutions = signal<string[]>([]);
    optionsDepartment = signal<FormControlOption[]>([]);
    optionsMunicipalies = signal<FormControlOption[]>([]);
    optionsRegime = signal<FormControlOption[]>([]);

    form: FormGroup;
    formCloneEntity: AdministrativeEntity_APPDTO;
    formEntity: IForm<AdministrativeEntity_APPDTO> = {
        code: [''],
        name: [''],
        address: [''],
        filingAddress: [''],
        email: [''],
        electronicBillingEmail: [''],
        phone: [''],
        otherData: [''],
        authorizationLength: [NaN],
        nit: [''],
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
        this.form.reset(this.formCloneEntity)
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
}
