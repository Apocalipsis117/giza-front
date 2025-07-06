import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { InputTextareaComponent } from '@im-inputs/input-textarea/input-textarea.component';
import { FormControlOption, IForm, Medicine_APPDTO, MedicineRateManual_APPDTO } from '@interfaces/index';
import { CostCenterService, PharmaceuticalFormService, TypeConcentrationService, TypeMedicineService, TypeServiceService, TypeUnitMeasurementService } from '@services/api';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-medicine',
    standalone: true,
    imports: [
        CommonModule,
        InputTextareaComponent,
        InputOnoffComponent,
        InputTextComponent,
        InputNumberComponent,
        InputSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-medicine.component.html'
})
export class FormMedicineComponent {
    private readonly typeMedicine$ = inject(TypeMedicineService);
    private readonly TypeUnitMeasurement$ = inject(TypeUnitMeasurementService);
    private readonly concentrationServ = inject(TypeConcentrationService);
    private readonly pharmaFormServ = inject(PharmaceuticalFormService);
    private readonly costCenterServ = inject(CostCenterService);
    private readonly typeServiceServ = inject(TypeServiceService);
    optionsTypeMedicine = signal<FormControlOption[]>([]);
    optionsMedicineUnit = signal<FormControlOption[]>([]);
    optionsConcentration = signal<FormControlOption[]>([]);
    optionsScope = signal<FormControlOption[]>([]);
    optionsPharmaForm = signal<FormControlOption[]>([]);
    optionsCostcenter = signal<FormControlOption[]>([]);
    optionsTypeServ = signal<FormControlOption[]>([]);
    fb = inject(FormBuilder);

    form!: FormGroup;
    formMedicineCLone: any;
    formMedicine: IForm<Medicine_APPDTO> = {
        code: [''],
        name: [''],
        atc: [''],
        cum: [NaN],
        cumConsecutive: [''],
        cumName: [''],
        referenceUnit: [''],
        otherName: [''],
        adverseEffect: [''],
        contraindications: [''],
        interactionIncompatibility: [''],
        liquid: [false],
        status: [false],
        medicineTypeId: [null],
        unitOfMeasureId: [null],
        concentrationId: [null],
        pharmaceuticalFormId: [null],
        costCenterId: [null],
        serviceTypeId: [null],
        administrationRouteIds: [[] as number[]],
        medicineGroupIds: [[] as number[]],
        medicineManualTariffMed: [[] as MedicineRateManual_APPDTO[]]
    }

    constructor() {
        this.form = this.fb.group(this.formMedicine);
        this.formMedicineCLone = ngFormHelper.unboxProperties(this.formMedicine)
    }

    ngOnInit(): void {
        const obs = forkJoin({
            typeMedicine: this.typeMedicine$.list('options'),
            medicineUnit: this.TypeUnitMeasurement$.list('options'),
            concentration: this.concentrationServ.getAll('options'),
            pharmaForm: this.pharmaFormServ.getAll('options'),
            costCenter: this.costCenterServ.list('options'),
            typeService: this.typeServiceServ.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsTypeMedicine.set(value.typeMedicine);
                this.optionsMedicineUnit.set(value.medicineUnit);
                this.optionsConcentration.set(value.concentration);
                this.optionsPharmaForm.set(value.pharmaForm);
                this.optionsCostcenter.set(value.costCenter);
                this.optionsTypeServ.set(value.typeService);
            }
        });
    }

    reset() {
        this.form.reset(this.formMedicineCLone);
    }

}
