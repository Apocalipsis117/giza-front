import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { DiagnosisDTO_APP } from '@interfaces/app';
import { IForm, FormControlOption } from '@interfaces/index';
import { BladePanelOptionsComponent } from '@layouts/dashboard/blades/blade-panel-options/blade-panel-options.component';
import { TestService } from '@services/app';

@Component({
    selector: 'form-diagnosis',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelCheckboxComponent,
        BladePanelOptionsComponent,
        // other
        ReactiveFormsModule
    ],
    templateUrl: './form-diagnosis.component.html'
})
export class FormDiagnosisComponent {
    setForm = input<FormGroup<IForm<DiagnosisDTO_APP>>>();
    testServ = inject(TestService);
    options = signal<FormControlOption[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.testServ.getOptions('options').subscribe(data => this.options.set(data));
    }
}
