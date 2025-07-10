import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { ActionName, BarActions, OxygenRate_APP, OxygenRate_APPDTO } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { OxygenRateService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormOxygenRateComponent } from './form-oxygen-rate/form-oxygen-rate.component';
import { TableOxygenRateComponent } from './table-oxygen-rate/table-oxygen-rate.component';
import { TdetailOxygenRateComponent } from './tdetail-oxygen-rate/tdetail-oxygen-rate.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { LocalOxygenRateService } from './local-oxygen-rate.service';

@Component({
    selector: 'app-oxygen-rate',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableOxygenRateComponent,
        FormOxygenRateComponent,
        TdetailOxygenRateComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './oxygen-rate.component.html'
})
export class OxygenRateComponent {
    private readonly destroyRef = inject(DestroyRef);
    readonly table = viewChild('table', { read: TableOxygenRateComponent });
    readonly formCreate = viewChild('formCreate', { read: FormOxygenRateComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormOxygenRateComponent });
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    private readonly OxygenRate$ = inject(OxygenRateService);
    private readonly local$ = inject(LocalOxygenRateService);
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
            this.local$.entityEmit(null);
        })
    }

    canGoOut(): Promise<boolean> | boolean {
        return this.swal.canOutup(this.formCreate()?.form.dirty)
    }

    barAction(e: ActionName) {
        const data = this.local$.getEntity();
        if (e === 'save') this.save();
        else if (e === 'reset') this.formCreate()?.reset();
        else if (e === 'clean') this.cleanTdetail();
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
        console.log("form", form?.value);
        /*if (form?.valid) {
            this.swal.loading();
            this.OxygenRate$.post(form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
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
        }*/
    }

    update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal.loading();
            const data = this.local$.getEntity();
            this.OxygenRate$.update(data!.id, form.value).subscribe({
                next: (value) => {
                    this.local$.entityEmit(value);
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

    deleteAlert(data: OxygenRate_APP | null) {
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

    delete(data: OxygenRate_APP) {
        this.swal.loading();
        this.OxygenRate$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal.alertSimple(text, 'success');
                this.table()?.queryAssistaces();
                this.local$.entityEmit(null);
            }
        });
    }

    cleanTdetail() {
        this.table()?.clean();
    }

    dataEdit(data: OxygenRate_APP | null) {
        if (data) {
            const values: OxygenRate_APPDTO = {
                name: data.name,
                status: data.status,
                value: data.value,
                medicineId: data.medicine.id
            }
            this.formUpdate()?.form.patchValue(values)
        }
    }
}
