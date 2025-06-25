import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { queryData } from '@helpers/index';
import { InstitutionDTO_APP } from '@interfaces/app';
import { CitiesOptionForm, IForm, OptionsForm } from '@interfaces/index';
import { BladePanelOptionsComponent } from '@layouts/dashboard/blades/blade-panel-options/blade-panel-options.component';
import { LegalNatureService, LevelComplexityService, ApartmentCitiesService } from '@services/api';

@Component({
    selector: 'form-institutions',
    standalone: true,
    templateUrl: './form-institutions.component.html',
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelCheckboxComponent,
        BladePanelOptionsComponent,
        ReactiveFormsModule
    ]
})
export class FormInstitutionsComponent {
    setForm = input<FormGroup<IForm<InstitutionDTO_APP>>>();
    apartmentServ = inject(ApartmentCitiesService);
    legalNatrueServ = inject(LegalNatureService);
    levelComplexityServ = inject(LevelComplexityService);
    optionsDepartment = signal<CitiesOptionForm[]>([]);
    optionsCities = signal<OptionsForm[]>([]);
    optionsLegalNature = signal<OptionsForm[]>([]);
    optionsLevelComplexity = signal<OptionsForm[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.legalNatrueServ.getAll('options').subscribe(data => this.optionsLegalNature.set(data));
        this.apartmentServ.getAll('options').subscribe(data => this.optionsDepartment.set(data));
        this.levelComplexityServ.getAll('options').subscribe(data => this.optionsLevelComplexity.set(data));
        this.changeApartment();
    }

    changeApartment() {
        this.form().get('departmentId')!.valueChanges.subscribe(value => {
            if (value) {
                let cities = queryData.cities(value, this.optionsDepartment());
                this.optionsCities.set(cities)
            }
        })
    }
}
