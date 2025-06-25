import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { HospitalServiceDTO_APP, IForm, OptionsForm } from '@interfaces/index';
import { CostCenterService, TypeAmbitService, TypeSexService } from '@services/api';
import { TestService } from '@services/app';

@Component({
    selector: 'form-hospital-services',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelCheckboxComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-hospital-services.component.html'
})
export class FormHospitalServicesComponent {
    setForm = input<FormGroup<IForm<HospitalServiceDTO_APP>>>();
    testServ = inject(TestService);
    costcenterServ = inject(CostCenterService);
    genderServ = inject(TypeSexService);
    ambitServ = inject(TypeAmbitService);
    options = signal<OptionsForm[]>([]);
    optionsCentercost = signal<OptionsForm[]>([]);
    optionsGender = signal<OptionsForm[]>([]);
    optionsAmbit = signal<OptionsForm[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.testServ.getOptions('options').subscribe(data => this.options.set(data));
        this.costcenterServ.getAll('options').subscribe(data => this.optionsCentercost.set(data));
        this.genderServ.getAll('options').subscribe(data => this.optionsGender.set(data));
        this.ambitServ.getAll('options').subscribe(data => this.optionsAmbit.set(data));
    }
}
