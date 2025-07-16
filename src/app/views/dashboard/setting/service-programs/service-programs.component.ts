import { Component, inject, signal, viewChild } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';
import { ServiceProgramsService } from '@services/api';
import { SweetalertService } from '@services/app';
import { TableServiceProgramsComponent } from './table-service-programs/table-service-programs.component';
import { FormServiceProgramsComponent } from './form-service-programs/form-service-programs.component';
import { BarActions, onBtn, ServicePrograms_APP, ServicePrograms_APPDTO } from '@interfaces/index';

@Component({
    selector: 'service-programs',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        BladeDialogComponent,
        CardBasicTextComponent,
        TableServiceProgramsComponent,
        FormServiceProgramsComponent
    ],
    templateUrl: './service-programs.component.html'
})
export class ServiceProgramsComponent {
    private readonly ServicePrograms$ = inject(ServiceProgramsService);
    private readonly swal$ = inject(SweetalertService);
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    readonly formCreate = viewChild('formCreate', { read: FormServiceProgramsComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormServiceProgramsComponent });
    readonly table = viewChild('table', { read: TableServiceProgramsComponent });
    vehicle = signal<ServicePrograms_APP | null>(null);
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
            this.ServicePrograms$.post(form.value).subscribe({
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

    private deleteAlert(data: ServicePrograms_APP | null) {
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

    private delete(data: ServicePrograms_APP) {
        this.swal$.loading();
        this.ServicePrograms$.delete(data.id).subscribe({
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
            this.ServicePrograms$.update(this.vehicle()!.id, form.value).subscribe({
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

    onTable(event: onBtn<ServicePrograms_APP>) {
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
            const values: ServicePrograms_APPDTO = {
                careProgramsId: NaN,
                code: data.code,
                component: data.component,
                consultationPurposeId: data.consultationPurpose.id,
                externalCauseId: data.externalCause.id,
                genderId: data.gender.id,
                id: data.id,
                maxAge: data.maxAge,
                minAge: data.minAge,
                name: data.name
            }
            this.formUpdate()?.setValues(values);
        }
    }
}
