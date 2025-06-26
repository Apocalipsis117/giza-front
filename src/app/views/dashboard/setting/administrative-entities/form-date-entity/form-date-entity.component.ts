import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper, queryData } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { AdministrativeEntity_APPDTO, IForm, FormControlOption } from '@interfaces/index';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { ApartmentCitiesService, TypeRegimeService } from '@services/api';
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
        InputNumberComponent
    ],
    templateUrl: './form-date-entity.component.html'
})
export class FormDateEntityComponent {
    private readonly fb = inject(FormBuilder);
    private readonly apartmentCities = inject(ApartmentCitiesService);
    private readonly typeRegime = inject(TypeRegimeService);

    resolutions = signal<string[]>([]);
    optionsDepartment = signal<FormControlOption[]>([]);
    optionsCities = signal<FormControlOption[]>([]);
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
        taxId: [null],
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

    ngOnInit(): void {
        this.apartmentCities.apartaments('options').subscribe(data => this.optionsDepartment.set(data));
        this.typeRegime.getAll('options').subscribe(data => this.optionsRegime.set(data));
        this.watchDepartamentId();
    }

    reset() {
        this.form.reset(this.formCloneEntity)
    }

    watchDepartamentId() {
        this.form.get('departmentId')!.valueChanges.pipe(distinctUntilChanged()).subscribe({
            next: (value) => {
                console.log("value", value);
            }
        })
    }
}
