import { Component, inject, signal, viewChild } from '@angular/core';
import { BarActions, onBtn, Vehicle_APP } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { VehicleService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormVehiclesComponent } from './form-vehicles/form-vehicles.component';
import { TableVehiclesComponent } from './table-vehicles/table-vehicles.component';

@Component({
    selector: 'page-vehicles',
    standalone: true,
    templateUrl: './vehicles.component.html',
    imports: [
        TableVehiclesComponent,
        FormVehiclesComponent,
        BladeDialogComponent,
        BladeBoxPanelComponent,
        BladePanelComponent,
        CardBasicTextComponent
    ]
})
export class VehiclesComponent {
    private readonly vehicle$ = inject(VehicleService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormVehiclesComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormVehiclesComponent});
    readonly table = viewChild('table', { read: TableVehiclesComponent});
    currentData = signal<Vehicle_APP|null>(null);
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
            this.vehicle$.post(form.value).subscribe({
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

    private deleteAlert(data: Vehicle_APP | null) {
        if(data) {
            this.swal$.toastConfirm('warning', {
                text: 'Seguro que desea elimina ' + `${data.brand} ${data.model} - ${data.plate}`,
                title: 'Confirmar'
            }).then(value => {
                if(value.isConfirmed) {
                    this.delete(data);
                }
            })
        }
    }

    private delete(data: Vehicle_APP) {
        this.swal$.loading();
        this.vehicle$.delete(data.uuid).subscribe({
            next: () => {
                const text = `${data.brand} ${data.model} - ${data.plate}` + ' ha sido liminado';
                this.swal$.alertSimple(text, 'success');
                this.table()?.queryDataTable();
            }
        });
    }

    private update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal$.loading();
            this.vehicle$.update(this.currentData()!.uuid, form.value).subscribe({
                complete: () => {
                    this.dialogUpdate()?.hide();
                    this.swal$.formSave('success');
                    this.table()?.queryDataTable();
                },
                error: () => this.swal$.formSave('error')
            })
        } else {
            this.swal$.formSave('warning');
            this.formUpdate()?.markAlltouched();
        }
    }

    onTable(event: onBtn<Vehicle_APP>) {
        const action = event.action;
        if(action === 'edit') {
            this.currentData.set(event.value);
            this.dialogUpdate()?.show();
            this.dataEdit();
        }
        else if(action === 'delete') {
            this.deleteAlert(event.value);
        }
    }

    dataEdit() {
        this.formUpdate()?.setValues(this.currentData());
    }
}
