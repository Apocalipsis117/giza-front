import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { MedicineDTO_APP } from '@interfaces/app';
import { IForm, FormControlOption } from '@interfaces/index';
import { TypeServiceService, PharmaceuticalFormService, TypeConcentrationService, TypeMedicineService, TypeMedicineUnitService, CostCenterService } from '@services/api';

@Component({
    selector: 'form-medicine',
    standalone: true,
    imports: [
        CommonModule,
        InputPanelSelectComponent,
        InputPanelTextComponent,
        InputPanelCheckboxComponent,
        InputPanelTextareaComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-medicine.component.html'
})
export class FormMedicineComponent {
    setForm = input<FormGroup>();
    medicineServ = inject(TypeMedicineService);
    medicineUnitServ = inject(TypeMedicineUnitService);
    concentrationServ = inject(TypeConcentrationService);
    pharmaFormServ = inject(PharmaceuticalFormService);
    costCenterServ = inject(CostCenterService);
    typeServiceServ = inject(TypeServiceService);
    optionsTypeMedicine = signal<FormControlOption[]>([]);
    optionsMedicineUnit = signal<FormControlOption[]>([]);
    optionsConcentration = signal<FormControlOption[]>([]);
    optionsScope = signal<FormControlOption[]>([]);
    optionsPharmaForm = signal<FormControlOption[]>([]);
    optionsCostcenter = signal<FormControlOption[]>([]);
    optionsTypeServ = signal<FormControlOption[]>([]);

    form = computed(() => this.setForm() as FormGroup<IForm<MedicineDTO_APP>>);

    ngOnInit(): void {
        this.medicineServ.getAll('options').subscribe(data => this.optionsTypeMedicine.set(data));
        this.medicineUnitServ.getAll('options').subscribe(data => this.optionsMedicineUnit.set(data));
        this.concentrationServ.getAll('options').subscribe(data => this.optionsConcentration.set(data));
        this.pharmaFormServ.getAll('options').subscribe(data => this.optionsPharmaForm.set(data));
        this.pharmaFormServ.getAll('options').subscribe(data => this.optionsPharmaForm.set(data));
        this.costCenterServ.getAll('options').subscribe(data => this.optionsCostcenter.set(data));
        this.typeServiceServ.getAll('options').subscribe(data => this.optionsTypeServ.set(data));
    }
}
