import { Component, inject, signal, viewChild } from '@angular/core';
import { BarActions, NameStateEntity_APP, NameStateEntity_APPDTO, onBtn } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { ManualInputMaterialsService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormManualInputMaterialsComponent } from './form-manual-input-materials/form-manual-input-materials.component';
import { TableManualInputMaterialsComponent } from './table-manual-input-materials/table-manual-input-materials.component';

@Component({
    selector: 'manual-input-materials',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormManualInputMaterialsComponent,
        TableManualInputMaterialsComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './manual-input-materials.component.html'
})
export class ManualInputMaterialsComponent {
    private readonly ManualInputMaterials$ = inject(ManualInputMaterialsService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    readonly formCreate = viewChild('formCreate', { read: FormManualInputMaterialsComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormManualInputMaterialsComponent });
    readonly table = viewChild('table', { read: TableManualInputMaterialsComponent });
    vehicle = signal<NameStateEntity_APP | null>(null);
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
        if (form?.valid) {
            this.swal$.loading();
            this.ManualInputMaterials$.post(form.value).subscribe({
                next: () => {
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
            })
        }
    }

    private delete(data: NameStateEntity_APP) {
        this.swal$.loading();
        this.ManualInputMaterials$.delete(data.id).subscribe({
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
            this.ManualInputMaterials$.update(this.vehicle()!.id, form.value).subscribe({
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

    onTable(event: onBtn<NameStateEntity_APP>) {
        const action = event.action;
        if (action === 'edit') {
            this.vehicle.set(event.value);
            this.dialogUpdate()?.show();
            this.dataEdit();
        }
        else if (action === 'delete') {
            this.deleteAlert(event.value);
        }
    }

    dataEdit() {
        const data = this.vehicle()
        if (data) {
            const values: NameStateEntity_APPDTO = {
                name: data.name,
                state: data.state
            }
            this.formUpdate()?.setValues(values);
        }
    }
}
