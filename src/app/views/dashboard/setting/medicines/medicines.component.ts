import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { ActionName, BarActions, Medicine_APP, Medicine_APPDTO, tabsControls } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { MedicineService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormMedicineComponent } from './form-medicine/form-medicine.component';
import { LocalMedicineService } from './local-medicine.service';
import { TableMedicineComponent } from './table-medicine/table-medicine.component';
import { DetailMedicineComponent } from './detail-medicine/detail-medicine.component';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-medicines',
    standalone: true,
    templateUrl: './medicines.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormMedicineComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        TableMedicineComponent,
        DetailMedicineComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ]
})
export class MedicinesComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly swal$ = inject(SweetalertService);
    private readonly Medicine$ = inject(MedicineService);
    private readonly local$ = inject(LocalMedicineService);
    readonly tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent });
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    readonly formCreate = viewChild('formCreate', { read: FormMedicineComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormMedicineComponent });
    readonly table = viewChild('table', { read: TableMedicineComponent });
    medicine = signal<Medicine_APP|null>(null);
    actionsDetail: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    actionsUpdate: BarActions = {
        update: true,
        return: true
    }
    tabs: tabsControls[] = [
        {
            active: true,
            idConnect: 'add-medicine',
            label: 'Nuevo medicamento'
        },
        {
            active: false,
            idConnect: 'list-mdicine',
            label: 'Medicamentos'
        }
    ];

    constructor() {
        this.destroyRef.onDestroy(() => {
            this.local$.entityEmit(null);
        })
        this.local$.readEntity$.subscribe({
            next: (value) => {
                this.medicine.set(value)
            }
        })
    }

    canGoOut(): Promise<boolean> | boolean {
        return this.swal$.canOutup(this.formCreate()?.form.dirty)
    }

    barAction(e: ActionName) {
        const data = this.local$.getEntity();
        if (e === 'save') this.save();
        else if (e === 'reset') this.formCreate()?.reset();
        else if (e === 'clean') this.cleanDetail();
        else if (e === 'edit') {
            if (data) {
                this.dataEdit(data);
                this.dialogUpdate()?.show();
            } else {
                this.swal$.alertSimple('Debe seleccionar una Entidad', 'info');
            }
        }
        else if (e === 'delete') {
            this.deleteAlert(data);
        }
        else if (e === 'update') this.update();
        else if (e === 'return') {
            this.dataEdit(data)
            this.swal$.alertSimple('Valores originales cargados.', 'success');
        }
    }

    private showTab(id: number) {
        this.tabController()?.showTab(this.tabs[id].idConnect);
    }

    private save() {
        const form = this.formCreate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            this.Medicine$.post(form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.swal$.formSave('success');
                    this.formCreate()?.reset();
                    this.table()?.queryAdministrativeEntities();
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formCreate()?.markAlltouched();
        }
    }

    private update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            const data = this.local$.getEntity();
            this.Medicine$.update(data!.id, form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
                },
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal$.formSave('success');
                    this.table()?.queryAdministrativeEntities();
                    this.showTab(1);
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }
    }

    private deleteAlert(data: Medicine_APP | null) {
        if (data) {
            this.swal$.toastConfirm('warning', {
                text: 'Seguro que desea elimina ' + data.name,
                title: 'Confirmar'
            }).then(value => {
                if (value.isConfirmed) {
                    this.delete(data);
                }
            })
        }
    }

    private delete(data: Medicine_APP) {
        this.swal$.loading();
        this.Medicine$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.queryAdministrativeEntities();
                this.local$.entityEmit(null);
            }
        });
    }

    private cleanDetail() {
        this.table()?.clean();
    }
    fb = inject(FormBuilder);

    private dataEdit(data: Medicine_APP | null) {
        if (data) {
            this.formUpdate()?.reset();
            const _ = data;
            const values: Medicine_APPDTO = {
                adverseEffect: _.adverseEffect,
                atc: _.atc,
                code: _.code,
                concentrationId: _.concentration.id,
                contraindications: _.contraindications,
                costCenterId: _.costCenter.id,
                cum: _.cum,
                cumConsecutive: _.cumConsecutive,
                cumName: _.cumName,
                liquid: _.liquid,
                unitPrice: _.unitPrice,
                medicineGroupIds: _.medicineGroups.map(x => x.id),
                interactionIncompatibility: _.interactionIncompatibility,
                administrationRouteIds: _.administrationRoutes.map(x => x.id),
                medicineTypeId: _.medicineType.id,
                name: _.name,
                otherName: _.otherName,
                status: _.status,
                serviceTypeId: 1,
                referenceUnit: _.referenceUnit,
                unitOfMeasureId: _.unitOfMeasure.id,
                pharmaceuticalFormId: _.pharmaceuticalForm.id,
                medicineManualTariffMed: []
            }
            this.formUpdate()?.setValues(values);
            const formArray = this.fb.array(
                _.medicineManualTariffMeds.map(item => this.fb.group({
                    id: [item.id],
                    value: [item.value],
                    medicineTariffManualId: [item.medicineTariffManual.id],
                }))
            );

            this.formUpdate()?.form.setControl('medicineManualTariffMed', formArray);
        }
    }
}
