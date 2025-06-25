import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ngFormHelper, queryData } from '@helpers/index';
import { AdministrativeEntitiesDTO_APP } from '@interfaces/app';
import { CitiesOptionForm, IForm, OptionsForm } from '@interfaces/index';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { ApartmentCitiesService, TypeRegimeService } from '@services/api';

@Component({
    selector: 'form-date-entity',
    standalone: true,
    imports: [
        CommonModule,
        InputPanelTextComponent,
        InputPanelCheckboxComponent,
        InputPanelSelectComponent,
        ReactiveFormsModule,
        TitleIconSectionComponent
    ],
    templateUrl: './form-date-entity.component.html'
})
export class FormDateEntityComponent {
    private readonly fb = inject(FormBuilder);
    private readonly apartmentCities = inject(ApartmentCitiesService);
    private readonly typeRegime = inject(TypeRegimeService);

    resolutions = signal<string[]>([]);
    optionsDepartment = signal<CitiesOptionForm[]>([]);
    optionsCities = signal<OptionsForm[]>([]);
    optionsRegime = signal<OptionsForm[]>([]);

    form: FormGroup;
    formCloneEntity: AdministrativeEntitiesDTO_APP;
    formEntity: IForm<AdministrativeEntitiesDTO_APP> = {
        code: [''], // int
        name: [''],
        taxId: [''],
        address: [''],
        filingAddress: [''],
        email: [''],
        electronicBillingEmail: [''],
        hasInsurance: [false],
        phone: [''],
        authorizationLength: [''], // int
        hasCopies: [false],
        ripsTaxIdVerification: [false],
        requiresAnnex2: [false],
        regimeId: [''], // int
        stateId: [''], // int
        cityId: [''], // int
        resolution: [''],
        isActive: [false],
        otherData: ['']
    }

    constructor() {
        this.form = this.fb.group(this.formEntity);
        this.formCloneEntity = ngFormHelper.unboxProperties(this.formEntity);
    }

    ngOnInit(): void {
        this.apartmentCities.getAll('options').subscribe(data => this.optionsDepartment.set(data));
        this.typeRegime.getAll('options').subscribe(data => this.optionsRegime.set(data));
        this.changeApartment();
    }

    reset() {
        this.form.reset(this.formCloneEntity)
    }

    changeApartment() {
        this.form.get('stateId')!.valueChanges.subscribe(value => {
            if (value) {
                let cities = queryData.cities(value, this.optionsDepartment());
                this.optionsCities.set(cities)
            }
        })
    }

    eventCheck(e: any) {
        const value = e.data.value;
        if (e.data.check) {
            this.resolutions.update(x => [...x, value])
        } else {
            this.resolutions.update(x => [...x.filter(v => v !== value)])
        }
        const res = this.resolutions().join(',')
        this.form.get('resolution')?.patchValue(res);
    }
}
