import { Component, computed, inject, input, signal, viewChild, viewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DirectivesModule } from '@directive/module';
import { generator, ngFormHelper } from '@helpers/index';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectAddComponent } from '@im-inputs/input-select-add/input-select-add.component';
import { InputSelectSearhComponent } from '@im-inputs/input-select-searh/input-select-searh.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { InputTextareaComponent } from '@im-inputs/input-textarea/input-textarea.component';
import { FormControlOption, FormGroupTyped, IForm, Medicine_APPDTO, tabsControls } from '@interfaces/index';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { CostCenterService, GroupMedicationService, ManualTariffMedicineService, PharmaceuticalFormService, TypeConcentrationService, TypeMedicineService, TypeServiceService, TypeUnitMeasurementService, TypeViaMedicationService } from '@services/api';
import { SweetalertService } from '@services/app';
import { ValidateNumberEmpty, ValidateStringEmpty, ValidStrict } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-medicine',
    standalone: true,
    imports: [
        InputTextareaComponent,
        InputOnoffComponent,
        InputTextComponent,
        InputNumberComponent,
        InputSelectComponent,
        InputSelectSearhComponent,
        ButtonComponent,
        ReactiveFormsModule,
        InputSelectAddComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule
    ],
    templateUrl: './form-medicine.component.html'
})
export class FormMedicineComponent {
    private validates = viewChildren('validate');
    public readonly isDataAPI = input<boolean>(false);
    private tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent });
    private readonly TypeMedicine$ = inject(TypeMedicineService);
    private readonly TypeUnitMeasurement$ = inject(TypeUnitMeasurementService);
    private readonly TypeConcentration$ = inject(TypeConcentrationService);
    private readonly PharmaceuticalForm$ = inject(PharmaceuticalFormService);
    private readonly TypeViaMedication$ = inject(TypeViaMedicationService);
    private readonly GroupMedication$ = inject(GroupMedicationService);
    private readonly ManualTariffMedicine$ = inject(ManualTariffMedicineService);
    private readonly CostCenter$ = inject(CostCenterService);
    private readonly TypeService$ = inject(TypeServiceService);
    private readonly swa$ = inject(SweetalertService);
    optionsTypeMedicine = signal<FormControlOption[]>([]);
    optionsMedicineUnit = signal<FormControlOption[]>([]);
    optionsConcentration = signal<FormControlOption[]>([]);
    optionsPharmaForm = signal<FormControlOption[]>([]);
    optionsCostcenter = signal<FormControlOption[]>([]);
    optionsTypeServ = signal<FormControlOption[]>([]);
    optionsGroupMedication = signal<FormControlOption[]>([]);
    optionsTypeViaMedication = signal<FormControlOption[]>([]);
    optionsTypeManualTariffMedicine = signal<FormControlOption[]>([]);
    fb = inject(FormBuilder);

    tabsControls: tabsControls[] = [
        {
            active: true,
            idConnect: 'one',
            label: 'Manual tarifa medicamento'
        },
        {
            active: false,
            idConnect: 'two',
            label: 'Vías de administración'
        },
        {
            active: false,
            idConnect: 'three',
            label: 'Grupos medicamento'
        }
    ];

    tabs = computed(() => {
        return this.tabsControls.map(x => ({ ...x, idConnect: generator.uuidShort() }))
    })

    form!: FormGroup;
    formMedicineCLone: any;
    formMedicine: IForm<Medicine_APPDTO> = {
        code: ['', [ValidateStringEmpty()]],
        name: ['', [ValidateStringEmpty()]],
        atc: ['', [ValidateStringEmpty()]],
        cum: [NaN, [ValidateNumberEmpty()]],
        unitPrice: [NaN, [ValidateNumberEmpty()]],
        cumConsecutive: [''],
        cumName: ['', [ValidateStringEmpty()]],
        referenceUnit: ['', [ValidateStringEmpty()]],
        otherName: ['', [ValidateStringEmpty()]],
        adverseEffect: [''],
        contraindications: [''],
        interactionIncompatibility: [''],
        liquid: [false],
        status: [true],
        medicineTypeId: [null, [ValidStrict()]],
        unitOfMeasureId: [null, [ValidStrict()]],
        concentrationId: [null],
        pharmaceuticalFormId: [null],
        costCenterId: [null],
        serviceTypeId: [null],
        administrationRouteIds: [[] as number[]],
        medicineGroupIds: [[] as number[]],
        medicineManualTariffMed: this.fb.array([])
    }

    constructor() {
        this.form = this.fb.group(this.formMedicine);
        this.formMedicineCLone = ngFormHelper.unboxProperties(this.formMedicine)
    }

    get control() {
        return this.form.controls as FormGroupTyped<Medicine_APPDTO>;
    }

    get medicineManualTariffMed() {
        return this.form.get('medicineManualTariffMed') as FormArray;
    }

    addTodo() {
        if(!ngFormHelper.canAddNewFormArrayItem(this.medicineManualTariffMed, ['medicineTariffManualId', 'value'])) {
            this.swa$.alertSimple('!Llene el agregado antes de añadir otro!', 'info');
            return
        };

        const todoGroup = this.fb.group({
            medicineTariffManualId: [null, Validators.required],
            value: ['', Validators.required],
            id: [null]
        });

        this.medicineManualTariffMed.push(todoGroup);
    }

    removeTodo(index: number) {
        const control = this.medicineManualTariffMed.at(index);
        const id = control.value.id;
        if(id) {
            this.swa$.alertSimpleConfirm('Confirmar eliminación').then(x => {
                if(!x.isConfirmed) return;
                this.ManualTariffMedicine$.delete(id).subscribe({
                    next: () => this.removeControl(index),
                    error: () => this.swa$.alertSimple('!UPS! hubo un error al tratar de eliminar.', 'error')
                })
            })
        } else {
            this.removeControl(index)
        }
    }

    removeControl(index: number) {
        this.medicineManualTariffMed.removeAt(index);
    }

    ngOnInit(): void {
        const obs = forkJoin({
            typeMedicine: this.TypeMedicine$.list('options'),
            medicineUnit: this.TypeUnitMeasurement$.list('options'),
            concentration: this.TypeConcentration$.list('options'),
            pharmaForm: this.PharmaceuticalForm$.list('options'),
            costCenter: this.CostCenter$.list('options'),
            typeService: this.TypeService$.list('options'),
            TypeViaMedication: this.TypeViaMedication$.list('options'),
            GroupMedication: this.GroupMedication$.list('options'),
            ManualTariffMedicine: this.ManualTariffMedicine$.list('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsTypeMedicine.set(value.typeMedicine);
                this.optionsMedicineUnit.set(value.medicineUnit);
                this.optionsConcentration.set(value.concentration);
                this.optionsPharmaForm.set(value.pharmaForm);
                this.optionsCostcenter.set(value.costCenter);
                this.optionsTypeServ.set(value.typeService);
                this.optionsTypeViaMedication.set(value.TypeViaMedication);
                this.optionsGroupMedication.set(value.GroupMedication);
                this.optionsTypeManualTariffMedicine.set(value.ManualTariffMedicine);
            }
        });
    }

    reset() {
        this.form.reset(this.formMedicineCLone);
        this.form.setControl('medicineManualTariffMed', this.fb.array([]));
    }

    // optional
    showTab(id: number) {
        this.tabController()?.showTab(this.tabsControls[id].idConnect);
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }

    setValues(values: Medicine_APPDTO) {
        this.form.setValue(values);
    }

}
