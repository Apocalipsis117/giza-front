import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { AssistanceServDTO_APP } from '@interfaces/app';
import { IForm, FormControlOption } from '@interfaces/index';
import { BladePanelOptionsComponent } from '@layouts/dashboard/blades/blade-panel-options/blade-panel-options.component';
import { ServiceLevelService, TypeHistoryService, TypeServiceService } from '@services/api';

@Component({
    selector: 'form-assistance-service',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        BladePanelOptionsComponent,
        ReactiveFormsModule,
        InputPanelCheckboxComponent
    ],
    templateUrl: './form-assistance-service.component.html'
})
export class FormAssistanceServiceComponent {
    public setForm = input<FormGroup<IForm<AssistanceServDTO_APP>>>();
    private readonly typeHistory = inject(TypeHistoryService);
    private readonly serviceLev = inject(ServiceLevelService);
    private readonly typeService = inject(TypeServiceService);
    typeHistoryOptions = signal<FormControlOption[]>([]);
    serviceLevOptions = signal<FormControlOption[]>([]);
    typeServiceOptions = signal<FormControlOption[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.typeHistory.getAll('options').subscribe(data => {
            this.typeHistoryOptions.set(data);
        })
        this.serviceLev.getAll('options').subscribe(data => {
            this.serviceLevOptions.set(data);
        })
        this.typeService.getAll('options').subscribe(data => {
            this.typeServiceOptions.set(data);
        })
    }
}
