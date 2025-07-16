import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormControlOption, FormGroupTyped, HealthcareServices_APPDTO, IForm } from '@interfaces/index';
import { BladePanelOptionsComponent } from '@layouts/dashboard/blades/blade-panel-options/blade-panel-options.component';
import { ServiceLevelService, TypeHistoryService, TypeServiceService } from '@services/api';
import { ValidateNumberEmpty, ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-assistance-service',
    standalone: true,
    imports: [
        InputOnoffComponent,
        InputTextComponent,
        InputSelectComponent,
        InputNumberComponent,
        BladePanelOptionsComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './form-assistance-service.component.html'
})
export class FormAssistanceServiceComponent {
    private validates = viewChildren('validate');
    private readonly typeHistory$ = inject(TypeHistoryService);
    private readonly serviceLevel$ = inject(ServiceLevelService);
    private readonly typeService$ = inject(TypeServiceService);
    typeHistoryOptions = signal<FormControlOption[]>([]);
    serviceLevOptions = signal<FormControlOption[]>([]);
    typeServiceOptions = signal<FormControlOption[]>([]);
    private fb = inject(FormBuilder);

    form!: FormGroup;
    formAssistanceCLone: HealthcareServices_APPDTO;
    formAssistance: IForm<HealthcareServices_APPDTO> = {
        name:              ['', [ValidateStringEmpty()]],
        opportunityDays:   [NaN, [ValidateNumberEmpty()]],
        indicatorCode:     [NaN, [ValidateNumberEmpty()]],
        institutionActive: [false],
        appointments:      [false],
        receive:           [false],
        doctor:            [false],
        surgery:           [false],
        specialists:       [false],
        medicines:         [false],
        otherServices:     [false],
        consultations:     [false],
        procedures:        [false],
        historyTypeId:     [null, [ValidStrict()]],
        serviceLevelId:    [null, [ValidStrict()]],
        serviceTypeId:     [null, [ValidStrict()]]
    };

    constructor() {
        this.form = this.fb.group(this.formAssistance);
        this.formAssistanceCLone = ngFormHelper.unboxProperties(this.formAssistance);
    }

    get control() {
        return this.form.controls as FormGroupTyped<HealthcareServices_APPDTO>;
    }

    ngOnInit(): void {
        const obs = forkJoin({
            typeHistory: this.typeHistory$.options(),
            serviceLevel: this.serviceLevel$.list('options'),
            typeService: this.typeService$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.typeHistoryOptions.set(value.typeHistory);
                this.serviceLevOptions.set(value.serviceLevel);
                this.typeServiceOptions.set(value.typeService);
            }
        });
    }

    reset() {
        this.form.reset(this.formAssistanceCLone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }
}
