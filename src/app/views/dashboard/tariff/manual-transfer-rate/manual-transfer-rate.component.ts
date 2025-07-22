import { Component, inject, signal, viewChild } from '@angular/core';
import { ManualTransferRateService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormManualTransferRateComponent } from './form-manual-transfer-rate/form-manual-transfer-rate.component';
import { TableManualTransferRateComponent } from './table-manual-transfer-rate/table-manual-transfer-rate.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { BarActions, NameStateEntity_APP, onBtn } from '@interfaces/index';

@Component({
    selector: 'manual-transfer-rate',
    imports: [
        FormManualTransferRateComponent,
        TableManualTransferRateComponent,
        BladeDialogComponent,
        BladeBoxPanelComponent,
        BladePanelComponent,
        CardBasicTextComponent
    ],
    templateUrl: './manual-transfer-rate.component.html'
})
export class ManualTransferRateComponent {
    private readonly ManualTransferRate$ = inject(ManualTransferRateService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    readonly formCreate = viewChild('formCreate', { read: FormManualTransferRateComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormManualTransferRateComponent });
    readonly table = viewChild('table', { read: TableManualTransferRateComponent });
    currentData = signal<NameStateEntity_APP | null>(null);
    actionsUpdate: BarActions = {
        update: true,
        return: true
    };

    barAction(e: string) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.formCreate()?.reset();
        else if (e === 'update') this.update();
        else if (e === 'return') {
            this.dataEdit();
            this.swal$.alertSimple('Valores originales cargados.', 'success');
        }
    }

    canGoOut(): Promise<boolean> | boolean {
        return this.swal$.canOutup(this.formCreate()?.form.dirty);
    }

    private save() {
        const form = this.formCreate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            this.ManualTransferRate$.post(form.value).subscribe({
                next: (data) => {
                    this.table()?.queryDataTable();
                    this.swal$.formSave('success');
                    this.formCreate()?.reset();
                },
                error: () => this.swal$.formSave('error')
            });
        } else {
            this.swal$.formSave('warning');
            this.formCreate()?.markAlltouched();
        }
    }

    private deleteAlert(data: NameStateEntity_APP | null) {
        if (data) {
            this.swal$.toastConfirm('warning', {
                text: 'Seguro que desea elimina ' + `${data.name}`,
                title: 'Confirmar'
            }).then(value => {
                if (value.isConfirmed) {
                    this.delete(data);
                }
            });
        }
    }

    private delete(data: NameStateEntity_APP) {
        this.swal$.loading();
        this.ManualTransferRate$.delete(data.id).subscribe({
            next: () => {
                const text = `${data.name}` + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.queryDataTable();
            }
        });
    }

    private update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            this.ManualTransferRate$.update(this.currentData()!.id, form.value).subscribe({
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal$.formSave('success');
                    this.table()?.queryDataTable();
                },
                error: () => this.swal$.formSave('error')
            });
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }
    }

    onTable(event: onBtn<NameStateEntity_APP>) {
        const action = event.action;
        if (action === 'edit') {
            this.currentData.set(event.value);
            this.dialogUpdate()?.show();
            this.dataEdit();
        }
        else if (action === 'delete') {
            this.deleteAlert(event.value);
        }
    }

    dataEdit() {
        const data = this.currentData();
        if (data) {
            this.formUpdate()?.setValues(data);
        }
    }
}
