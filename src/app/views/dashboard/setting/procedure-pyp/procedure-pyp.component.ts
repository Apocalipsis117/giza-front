import { Component, inject, signal, viewChild } from '@angular/core';
import { SweetalertService } from '@services/app';
import { ProcedurePypService } from 'src/app/core/services/api/setting/procedure-pyp.service';
import { TableProcedurePypComponent } from './table-procedure-pyp/table-procedure-pyp.component';
import { FormProcedurePypComponent } from './form-procedure-pyp/form-procedure-pyp.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { BarActions, onBtn, ProcedurePyp_APP, ProcedurePyp_APPDTO } from '@interfaces/index';

@Component({
    selector: 'procedure-pyp',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableProcedurePypComponent,
        FormProcedurePypComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './procedure-pyp.component.html'
})
export class ProcedurePypComponent {
    private readonly vehicle$ = inject(ProcedurePypService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    readonly formCreate = viewChild('formCreate', { read: FormProcedurePypComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormProcedurePypComponent });
    readonly table = viewChild('table', { read: TableProcedurePypComponent });
    vehicle = signal<ProcedurePyp_APP | null>(null);
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

    private deleteAlert(data: ProcedurePyp_APP | null) {
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

    private delete(data: ProcedurePyp_APP) {
        this.swal$.loading();
        this.vehicle$.delete(data.id).subscribe({
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
            this.vehicle$.update(this.vehicle()!.id, form.value).subscribe({
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

    onTable(event: onBtn<ProcedurePyp_APP>) {
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
            const values: ProcedurePyp_APPDTO = {
                code: data.code,
                name: data.name,
                pypServiceTypeId: data.pypServiceType.id
            }
            this.formUpdate()?.setValues(values);
        }
    }
}
