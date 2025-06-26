import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { ContractDTO_APP, IForm, FormControlOption } from '@interfaces/index';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { BenefitPlanService, LevelServiceService, OxygenRateService, TypeAttentionService, TypeModalityService, TypeRegimeService } from '@services/api';

@Component({
    selector: 'form-contracts',
    standalone: true,
    imports: [
        CommonModule,
        InputPanelSelectComponent,
        InputPanelTextareaComponent,
        InputPanelTextComponent,
        InputPanelCheckboxComponent,
        TitleIconSectionComponent,
        ReactiveFormsModule,
        InputPanelTimeComponent
    ],
    templateUrl: './form-contracts.component.html'
})
export class FormContractsComponent {
    public readonly setForm = input<FormGroup<IForm<ContractDTO_APP>>>();
    private readonly level$ = inject(LevelServiceService);
    private readonly modality$ = inject(TypeModalityService);
    private readonly benefitPlan$ = inject(BenefitPlanService);
    private readonly typeAttention$ = inject(TypeAttentionService);
    private readonly oxigenRate$ = inject(OxygenRateService);
    private readonly regimen$ = inject(TypeRegimeService);
    optionsModality = signal<FormControlOption[]>([]);
    optionsLevel = signal<FormControlOption[]>([]);
    optionsBeneficies = signal<FormControlOption[]>([]);
    optionsRegimen = signal<FormControlOption[]>([]);
    optionsTypeAttention = signal<FormControlOption[]>([]);
    optionsOxigenRate = signal<FormControlOption[]>([]);

    form = computed(() => this.setForm() as FormGroup);

    ngOnInit(): void {
        this.modality$.getAll('options').subscribe(data => this.optionsModality.set(data));
        this.level$.getAll('options').subscribe(data => this.optionsLevel.set(data));
        this.benefitPlan$.getAll('options').subscribe(data => this.optionsBeneficies.set(data));
        this.regimen$.getAll('options').subscribe(data => this.optionsRegimen.set(data));
        this.typeAttention$.getAll('options').subscribe(data => this.optionsTypeAttention.set(data));
        this.oxigenRate$.getAll('options').subscribe(data => this.optionsOxigenRate.set(data));
    }
}
