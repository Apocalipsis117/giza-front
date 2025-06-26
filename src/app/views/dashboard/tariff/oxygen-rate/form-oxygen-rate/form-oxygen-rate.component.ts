import { Component, Input, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { IForm, FormControlOption } from '@interfaces/index';
import { OxygenRateDTO_APP } from '@interfaces/app';
import { MedicineService } from '@services/api';

@Component({
    selector: 'form-oxygen-rate',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelCheckboxComponent,
        InputPanelSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-oxygen-rate.component.html'
})
export class FormOxygenRateComponent {
    public setForm = input<FormGroup<IForm<OxygenRateDTO_APP>>>();

    form = computed(() => this.setForm() as FormGroup);
    medicineServ = inject(MedicineService);
    optionsMedicine = signal<FormControlOption[]>([]);

    ngOnInit(): void {
        this.medicineServ.getAll('options').subscribe(data => this.optionsMedicine.set(data));
    }
}
