import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { CostCenterDTO_APP, IForm, FormControlOption } from '@interfaces/index';
import { TypeAreaService } from '@services/api';

@Component({
    selector: 'form-cost-center',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelCheckboxComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-cost-center.component.html'
})
export class FormCostCenterComponent {
    setForm = input<FormGroup<IForm<CostCenterDTO_APP>>>();
    areaServ = inject(TypeAreaService);
    optionsArea = signal<FormControlOption[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.areaServ.getAll('options').subscribe(data => this.optionsArea.set(data))
    }
}
