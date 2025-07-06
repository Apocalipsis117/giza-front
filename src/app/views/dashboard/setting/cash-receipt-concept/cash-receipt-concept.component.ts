import { Component, inject, signal, viewChild } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormCashConceptComponent } from './form-cash-concept/form-cash-concept.component';
import { TableCashConceptComponent } from './table-cash-concept/table-cash-concept.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { CashReceiptConceptService } from 'src/app/core/services/api/setting/cash-receipt-concept.service';
import { SweetalertService } from '@services/app';
import { BarActions, NameIdEntity_APP, NameIdEntity_APPDTO, onBtn } from '@interfaces/index';

@Component({
    selector: 'cash-receipt-concept',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormCashConceptComponent,
        TableCashConceptComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './cash-receipt-concept.component.html'
})
export class CashReceiptConceptComponent {
    private readonly CashReceiptConcept$ = inject(CashReceiptConceptService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormCashConceptComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormCashConceptComponent});
    readonly table = viewChild('table', { read: TableCashConceptComponent});
    vehicle = signal<NameIdEntity_APP|null>(null);
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
            this.CashReceiptConcept$.post(form.value).subscribe({
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

    private deleteAlert(data: NameIdEntity_APP | null) {
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

    private delete(data: NameIdEntity_APP) {
        this.swal$.loading();
        this.CashReceiptConcept$.delete(data.id).subscribe({
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
            this.CashReceiptConcept$.update(this.vehicle()!.id, form.value).subscribe({
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

    onTable(event: onBtn<NameIdEntity_APP>) {
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
            const values: NameIdEntity_APPDTO = {
                name: data.name
            }
            this.formUpdate()?.setValues(values);
        }
    }
}
