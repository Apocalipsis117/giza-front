import { Component, inject, signal, viewChild } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableAdverseEventsComponent } from './table-adverse-events/table-adverse-events.component';
import { FormAdverseEventsComponent } from './form-adverse-events/form-adverse-events.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { SweetalertService } from '@services/app';
import { AdverseEventsService } from 'src/app/core/services/api/setting/adverse-events.service';
import { BarActions, NameIdEntity_APP, NameIdEntity_APPDTO, onBtn } from '@interfaces/index';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';

@Component({
    selector: 'adverse-events',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableAdverseEventsComponent,
        FormAdverseEventsComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './adverse-events.component.html'
})
export class AdverseEventsComponent {
    private readonly CashReceiptConcept$ = inject(AdverseEventsService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormAdverseEventsComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormAdverseEventsComponent});
    readonly table = viewChild('table', { read: TableAdverseEventsComponent});
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
