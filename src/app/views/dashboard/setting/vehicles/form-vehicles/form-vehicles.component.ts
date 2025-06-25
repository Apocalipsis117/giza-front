import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { IForm, OptionsForm, VehiclesTDO_APP } from '@interfaces/index';
import { QueryStaticService, TypeVehicleService } from '@services/api';

@Component({
    selector: 'form-vehicles',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelCheckboxComponent,
        ReactiveFormsModule,
        InputPanelTextareaComponent,
        InputPanelSelectComponent,
    ],
    templateUrl: './form-vehicles.component.html'
})
export class FormVehiclesComponent {
    public setForm = input<FormGroup<IForm<VehiclesTDO_APP>>>();
    typeVehicle = inject(TypeVehicleService);
    staticApi = inject(QueryStaticService);

    optionsTypevehicles = signal<OptionsForm[]>([]);
    optionsBrandsvehicles = signal<OptionsForm[]>([]);
    optionsActivityVehicle = signal<OptionsForm[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.typeVehicle.getAll('options').subscribe(data => this.optionsTypevehicles.set(data))
        this.typeVehicle.brands('options').subscribe(data => this.optionsBrandsvehicles.set(data))
        this.queryApiStatic();
    }

    queryApiStatic() {
        this.staticApi.vehicleState().subscribe(data => {
            const options: OptionsForm[] = data.map(x => x.optionForm);
            this.optionsActivityVehicle.set(options);
        })
    }
}
