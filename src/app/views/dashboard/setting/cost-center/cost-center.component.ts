import { Component, inject, signal, viewChild } from '@angular/core';
import { BarActions, CostCenter_APP, CostCenter_APPDTO, onBtn } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { CostCenterService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormCostCenterComponent } from './form-cost-center/form-cost-center.component';
import { TableCostCenterComponent } from './table-cost-center/table-cost-center.component';

@Component({
    selector: 'cost-center',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableCostCenterComponent,
        FormCostCenterComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './cost-center.component.html'
})
export class CostCenterComponent {
    private readonly costCenter$ = inject(CostCenterService);
    private readonly swal$ = inject(SweetalertService);
    readonly formCreate = viewChild('formCreate', { read: FormCostCenterComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormCostCenterComponent});
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly table = viewChild('table', { read: TableCostCenterComponent});
    vehicle = signal<CostCenter_APP|null>(null);
    actionsUpdate: BarActions = {
        update: true,
        return: true
    }

    barAction(e: string) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.formCreate()?.reset();
        else if (e === 'update') this.update();
        else if (e === 'return') {
            this.dataEdit()
            this.swal$.alertSimple('Valores originales cargados.', 'success');
        }
    }

    canGoOut(): Promise<boolean> | boolean {
        return this.swal$.canOutup(this.formCreate()?.form.dirty)
    }

    private save() {
        const form = this.formCreate()?.form;
        if(form?.valid) {
            this.swal$.loading();
            this.costCenter$.post(form.value).subscribe({
                next: (data) => {
                    this.table()?.queryVehicleList();
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

    private deleteAlert(data: CostCenter_APP | null) {
        if(data) {
            this.swal$.toastConfirm('warning', {
                text: 'Seguro que desea elimina ' + `${data.name}`,
                title: 'Confirmar'
            }).then(value => {
                if(value.isConfirmed) {
                    this.delete(data);
                }
            })
        }
    }

    private delete(data: CostCenter_APP) {
        this.swal$.loading();
        this.costCenter$.delete(data.id).subscribe({
            next: () => {
                const text = `${data.name}` + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.queryVehicleList();
            }
        });
    }

    private update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            this.costCenter$.update(this.vehicle()!.id, form.value).subscribe({
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal$.formSave('success');
                    this.table()?.queryVehicleList();
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }
    }

    onTable(event: onBtn<CostCenter_APP>) {
        const action = event.action;
        if(action === 'edit') {
            this.vehicle.set(event.value);
            this.dialogUpdate()?.show();
            this.dataEdit();
        }
        else if(action === 'delete') {
            this.deleteAlert(event.value);
        }
    }

    dataEdit() {
        const data = this.vehicle()
        if(data) {
            const values: CostCenter_APPDTO = {
                accountingAccount: data.accountingAccount,
                areaId: data.area!.id,
                name: data.name,
                status: data.status
            }
            this.formUpdate()?.setValues(values);
        }
    }
}


