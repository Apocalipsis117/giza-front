import { Component, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DirectivesModule } from '@directive/module';
import { ngFormHelper, queries } from '@helpers/index';
import { ActionName, BarActions, IForm, Medicine_APPDTO, Medicine_PageAPP, MedicineRateManual_APPDTO, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { FormUpdateCumComponent } from '@layouts/dashboard/forms/form-update-cum/form-update-cum.component';
import { NoteComponent } from '@layouts/shared/note/note.component';
import { MedicineService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormMedicineComponent } from './form-medicine/form-medicine.component';
import { TableMedicineComponent } from './table-medicine/table-medicine.component';
import { TdetailMedicineComponent } from './tdetail-medicine/tdetail-medicine.component';

@Component({
    selector: 'app-medicines',
    standalone: true,
    templateUrl: './medicines.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        BladeBoxTitleComponent,
        FormMedicineComponent,
        FormUpdateCumComponent,
        NoteComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        TableMedicineComponent,
        TdetailMedicineComponent
    ]
})
export class MedicinesComponent {
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent});
    readonly table = viewChild('table', { read: TableMedicineComponent});
    medicineServ = inject(MedicineService);
    swal = inject(SweetalertService);
    fb = inject(FormBuilder);
    medicineData = signal<Medicine_PageAPP | null>(null);
    paramPaginate = signal<any>(queries.paramsPage);
    actionssBar: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    tabsControls: tabsControls[] = [
        {
            active: true,
            idConnect: 'tab-medicine-a',
            label: 'Nueva'
        },
        {
            active: false,
            idConnect: 'tab-medicine-b',
            label: 'Lista'
        }
    ];
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
        this.queryMedicine();
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
        else if (e === 'clean') this.table()?.clean();
    }

    queryMedicine() {
        this.medicineServ.getAllPage(this.paramPaginate()).subscribe(data => this.medicineData.set(data))
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.medicineServ.post(this.form.value).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.reset();
                    this.showTab(1);
                },
                error: () => this.swal.formSave('error')
            })
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.formMedicineCLone);
    }

    showTab(id: number) {
        this.tabController()?.showTab(this.tabsControls[id].idConnect);
    }

    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryMedicine();
    }
}
