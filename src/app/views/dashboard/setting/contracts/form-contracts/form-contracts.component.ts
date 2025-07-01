import { Component, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputDateComponent } from '@im-inputs/input-date/input-date.component';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { InputTextareaComponent } from '@im-inputs/input-textarea/input-textarea.component';
import { Contract_APPDTO, FormControlOption, FormGroupTyped, IForm, StepAction, tabsControls } from '@interfaces/index';
import { BarStepsComponent } from '@layouts/dashboard/bars/bar-steps/bar-steps.component';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { AdministrativeEntitiesService, BenefitPlanService, LevelServiceService, ManualTariffMedicineService, OxygenRateService, TariffManualService, TariffMedicineService, TypeAttentionService, TypeModalityService, TypeModeratePaymentService, TypeRegimeService } from '@services/api';
import { forkJoin, take } from 'rxjs';

@Component({
    selector: 'form-contracts',
    standalone: true,
    imports: [
        BladeBoxCollapseComponent,
        BladeCollapseBlockComponent,
        ReactiveFormsModule,
        InputTextComponent,
        InputSelectComponent,
        InputDateComponent,
        InputOnoffComponent,
        InputNumberComponent,
        InputTextareaComponent,
        BarStepsComponent
    ],
    templateUrl: './form-contracts.component.html'
})
export class FormContractsComponent {
    private collpase = viewChild('collpase', { read: BladeBoxCollapseComponent});
    private readonly level$ = inject(LevelServiceService);
    private readonly modality$ = inject(TypeModalityService);
    private readonly benefitPlan$ = inject(BenefitPlanService);
    private readonly tariffManual$ = inject(TariffManualService);
    private readonly tariffMedicine$ = inject(TariffMedicineService);
    private readonly typeAttention$ = inject(TypeAttentionService);
    private readonly oxigenRate$ = inject(OxygenRateService);
    private readonly manualTariffMedicine$ = inject(ManualTariffMedicineService);
    private readonly regimen$ = inject(TypeRegimeService);
    private readonly administrativeEntities$ = inject(AdministrativeEntitiesService);
    private readonly typeModeratePayment$ = inject(TypeModeratePaymentService);
    optionsModality = signal<FormControlOption[]>([]);
    optionsLevel = signal<FormControlOption[]>([]);
    optionstariffManual= signal<FormControlOption[]>([]);
    optionsBeneficies = signal<FormControlOption[]>([]);
    optionsRegimen = signal<FormControlOption[]>([]);
    optionsTypeAttention = signal<FormControlOption[]>([]);
    optionsTariffMedicine = signal<FormControlOption[]>([]);
    optionsOxigenRate = signal<FormControlOption[]>([]);
    optionsAdminEntities = signal<FormControlOption[]>([]);
    optionsManualTariffMedicine = signal<FormControlOption[]>([]);
    optionsTypeModeratePayment = signal<FormControlOption[]>([]);
    stepActive = signal<string | number>('');
    steps: StepAction[] = [
        {
            action: 'collapse-one',
            label: 'Paso 1',
            text: 'Datos base contrato'
        },
        {
            action: 'collapse-two',
            label: 'Paso 2',
            text: 'Parametros'
        },
        {
            action: 'collapse-three',
            label: 'Paso 3',
            text: 'Tarifa y/o Programas de Atención'
        }
    ];
    collapseControl: tabsControls[] = [
        {
            active: true,
            idConnect: 'collapse-one',
            label: 'Principales',
            icon: 'icofont-search-document'
        },
        {
            active: false,
            label: 'Parametros',
            idConnect: 'collapse-two',
            icon: 'icofont-search-document'
        },
        {
            active: false,
            idConnect: 'collapse-three',
            label: 'Tarifa y/o Programas de Atención',
            icon: 'icofont-ui-clip-board'
        }
    ]
    onoffText: [string, string] = ['Habilitar', 'Habilitado'];
    private fb = inject(FormBuilder);

    form: FormGroup;
    contractFormClone: Contract_APPDTO;
    contractControls: IForm<Contract_APPDTO> = {
        code: [NaN],
        contractNumber: [''],// ok
        contractName: [''],// ok
        startDate: [''],// ok
        endDate: [''],// ok
        upc: [NaN],// ok
        active: [true],
        additionalUsersNumber: [''],// ok
        contractValue: [NaN],// ok
        invoiceAccount: [''],// ok
        observation: [''],// ok
        groupBilling: [false],// ok
        outpatientAuthorization: [false],// ok
        hospitalizationAuthorization: [false],// ok
        emergencyAuthorization: [false],// ok
        rightsVerification: [false],// ok
        multivitamins: [false],// ok
        soat: [false],// ok
        copayment: [false],// ok
        administratorEntitiesId: [null],// ok
        benefitPlanId: [null],// ok
        tariffManualId: [null],// ok
        medicationTariffId: [null],// ok
        moderatePaymentTypeId: [null],// ok
        materialsSuppliesTariffId: [null],
        transfersTariffId: [null],
        oxygenTariffId: [null],
        careTypeId: [null],
        levelId: [null],
        attentionProgramsId: [[] as number[]]
    }

    constructor() {
        this.form = this.fb.group(this.contractControls);
        this.contractFormClone = ngFormHelper.unboxProperties(this.contractControls);
        // init step
        const stepActive = this.steps[0].action;
        this.stepActive.set(stepActive);
    }

    get control() {
        return this.form.controls as FormGroupTyped<Contract_APPDTO>;
    }

    ngOnInit(): void {
        const obs = forkJoin({
            modality: this.modality$.list('options'),
            level: this.level$.list('options'),
            benefitPlan: this.benefitPlan$.list('options'),
            regimen: this.regimen$.list('options'),
            typeAttention: this.typeAttention$.list('options'),
            oxigenRate: this.oxigenRate$.list('options'),
            administrativeEntities: this.administrativeEntities$.list('options'),
            tariffManual: this.tariffManual$.list('options'),
            tariffMedicine: this.tariffMedicine$.list('options'),
            optionsManualTariffMedicine: this.manualTariffMedicine$.list('options'),
            typeModeratePayment: this.typeModeratePayment$.list('options'),
        });

        obs.pipe(take(1)).subscribe({
            next: (value) => {
                this.optionsModality.set(value.modality);
                this.optionsLevel.set(value.level);
                this.optionsBeneficies.set(value.benefitPlan);
                this.optionsRegimen.set(value.regimen);
                this.optionsTypeAttention.set(value.typeAttention);
                this.optionsOxigenRate.set(value.oxigenRate);
                this.optionsAdminEntities.set(value.administrativeEntities);
                this.optionstariffManual.set(value.tariffManual);
                this.optionsTariffMedicine.set(value.tariffMedicine);
                this.optionsManualTariffMedicine.set(value.optionsManualTariffMedicine);
                this.optionsTypeModeratePayment.set(value.typeModeratePayment);
            }
        });
    }

    reset() {
        this.form.reset(this.contractFormClone);
    }

    onStep(action: string) {
        this.stepActive.set(action);
        const collapse = this.collapseControl.find(x => x.idConnect === action);
        if(collapse) {
            this.collpase()?.show(collapse.idConnect)
        }
    }

    onCollapse(action: string) {
        this.stepActive.set(action);
    }
}
