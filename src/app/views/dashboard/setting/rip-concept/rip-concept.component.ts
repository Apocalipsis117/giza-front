import { Component, inject, signal, viewChild } from '@angular/core';
import { BarActions, onBtn, RipConcept_APP, RipConcept_APPDTO } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { RipConceptService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormRipconceptComponent } from './form-ripconcept/form-ripconcept.component';
import { TableRipconceptComponent } from './table-ripconcept/table-ripconcept.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';

@Component({
    selector: 'rip-concept',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableRipconceptComponent,
        FormRipconceptComponent,
        BladeDialogComponent,
        CardBasicTextComponent
    ],
    templateUrl: './rip-concept.component.html'
})
export class RipConceptComponent {
    private readonly RipConcept$ = inject(RipConceptService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent});
    readonly formCreate = viewChild('formCreate', { read: FormRipconceptComponent});
    readonly formUpdate = viewChild('formUpdate', { read: FormRipconceptComponent});
    readonly table = viewChild('table', { read: TableRipconceptComponent});
    vehicle = signal<RipConcept_APP|null>(null);
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
            this.RipConcept$.post(form.value).subscribe({
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

    private deleteAlert(data: RipConcept_APP | null) {
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

    private delete(data: RipConcept_APP) {
        this.swal$.loading();
        this.RipConcept$.delete(data.id).subscribe({
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
            this.RipConcept$.update(this.vehicle()!.id, form.value).subscribe({
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

    onTable(event: onBtn<RipConcept_APP>) {
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
            const values: RipConcept_APPDTO = {
                name: data.name,
                serviceTypeId: data.serviceType.id,
                soatGroupId: data.soatGroup.id
            }
            this.formUpdate()?.setValues(values);
        }
    }
}
