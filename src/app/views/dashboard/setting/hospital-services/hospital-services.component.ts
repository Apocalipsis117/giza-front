import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { ActionName, BarActions, HospitalService_APP, HospitalService_APPDTO } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { HospitalServService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormHospitalServicesComponent } from './form-hospital-services/form-hospital-services.component';
import { LocalHospitalServService } from './local-hospital-serv.service';
import { TableHospitalServicesComponent } from './table-hospital-services/table-hospital-services.component';
import { DetailHospitalServicesComponent } from './detail-hospital-services/detail-hospital-services.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';

@Component({
    selector: 'hospital-services',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableHospitalServicesComponent,
        FormHospitalServicesComponent,
        DetailHospitalServicesComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './hospital-services.component.html'
})
export class HospitalServicesComponent {
    private readonly destroyRef = inject(DestroyRef);
    readonly table = viewChild('table', { read: TableHospitalServicesComponent });
    readonly formCreate = viewChild('formCreate', { read: FormHospitalServicesComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormHospitalServicesComponent });
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    private readonly HospitalServ$ = inject(HospitalServService);
    private readonly local$ = inject(LocalHospitalServService);
    private swal = inject(SweetalertService);
    actionsBar: BarActions = {
        edit: true,
        delete: true,
        clean: true
    };
    actionsUpdate: BarActions = {
        update: true,
        return: true
    }

    constructor() {
        this.destroyRef.onDestroy(() => {
            this.local$.assistanceServEmit(null);
        })
    }

    canGoOut(): Promise<boolean> | boolean {
        return this.swal.canOutup(this.formCreate()?.form.dirty)
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
                this.swal.alertSimple('Debe seleccionar una Entidad', 'info');
            }
        }
        else if (e === 'delete') {
            this.deleteAlert(data);
        }
        else if (e === 'update') this.update();
        else if (e === 'return') {
            this.dataEdit(data)
            this.swal.alertSimple('Valores originales cargados.', 'success');
        }
    }

    save() {
        const form = this.formCreate()?.form;
        if (form?.valid) {
            this.swal.loading();
            this.HospitalServ$.post(form.value).subscribe({
                next: (value) => {
                    this.local$.assistanceServEmit(value);
                },
                complete: () => {
                    this.swal.formSave('success');
                    this.table()?.queryAssistaces();
                    this.formCreate()?.reset();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
            form?.markAllAsTouched();
            this.formCreate()?.validate();
        }
    }

    update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal.loading();
            const data = this.local$.getEntity();
            this.HospitalServ$.update(data!.id, form.value).subscribe({
                next: (value) => {
                    this.local$.assistanceServEmit(value);
                },
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal.formSave('success');
                    this.table()?.queryAssistaces();
                },
                error: () => this.swal.formSave('error')
            })
        } else {
            this.swal.formSave('warning');
            form?.markAllAsTouched();
            this.formUpdate()?.validate();
        }
    }

    deleteAlert(data: HospitalService_APP | null) {
        if (data) {
            this.swal.toastConfirm('warning', {
                text: 'Seguro que desea elimina ' + data.name,
                title: 'Confirmar'
            }).then(value => {
                if (value.isConfirmed) {
                    this.delete(data);
                }
            })
        }
    }

    delete(data: HospitalService_APP) {
        this.swal.loading();
        this.HospitalServ$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal.alertSimple(text, 'success');
                this.table()?.queryAssistaces();
                this.local$.assistanceServEmit(null);
            }
        });
    }

    cleanDetail() {
        this.table()?.clean();
    }

    dataEdit(data: HospitalService_APP | null) {
        if (data) {
            const values: HospitalService_APPDTO = {
                bedCount: data.bedCount,
                costCenterId: data.costCenter.id,
                genderId: data.gender.id,
                maxAge: data.maxAge,
                minAge: data.minAge,
                name: data.name,
                scopeId: data.scope.id,
                status: data.status
            }
            this.formUpdate()?.form.patchValue(values)
        }
    }
}
