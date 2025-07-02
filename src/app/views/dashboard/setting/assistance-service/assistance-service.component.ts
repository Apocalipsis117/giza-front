import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { ActionName, BarActions, HealthcareServices_APP, HealthcareServices_APPDTO } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { HealthcareServicesService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormAssistanceServiceComponent } from './form-assistance-service/form-assistance-service.component';
import { TableAssistanceServiceComponent } from './table-assistance-service/table-assistance-service.component';
import { TdetailAssistanceServiceComponent } from './tdetail-assistance-service/tdetail-assistance-service.component';
import { LocalAssistanceServiceService } from './local-assistance-service.service';
import { BladeDialogComponent } from '@layouts/dashboard/blades/blade-dialog/blade-dialog.component';
import { CardBasicTextComponent } from '@layouts/dashboard/cards/card-basic-text/card-basic-text.component';

@Component({
    selector: 'app-assistance-service',
    standalone: true,
    templateUrl: './assistance-service.component.html',
    imports: [
        CommonModule,
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableAssistanceServiceComponent,
        FormAssistanceServiceComponent,
        BladeDialogComponent,
        TdetailAssistanceServiceComponent,
        CardBasicTextComponent
    ]
})
export class AssistanceServiceComponent {
    private readonly destroyRef = inject(DestroyRef);
    readonly table = viewChild('table', { read: TableAssistanceServiceComponent });
    readonly form = viewChild('form', { read: FormAssistanceServiceComponent });
    readonly formUpdate = viewChild('formUpdate', { read: FormAssistanceServiceComponent });
    readonly dialogUpdate = viewChild('dialogUpdate', { read: BladeDialogComponent });
    private readonly HealthcareServices$ = inject(HealthcareServicesService);
    private readonly local$ = inject(LocalAssistanceServiceService);
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
            this.local$.assistanceServEmit(null);
        })
    }

    canGoOut(): Promise<boolean> | boolean {
        if (this.form()?.form.dirty) {
            return this.swal.alertSimpleConfirm('Tiene datos sin guardar. ¿Seguro de que quiere salir?')
                .then((result) => {
                    return result.isConfirmed;
                });
        }
        return true;
    }

    barAction(e: ActionName) {
        const data = this.local$.getEntity();
        if (e === 'save') this.save();
        else if (e === 'reset') this.form()?.reset();
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
        const form = this.form()?.form;
        if (form?.valid) {
            this.swal.loading();
            this.HealthcareServices$.post(form.value).subscribe({
                next: (value) => {
                    this.local$.assistanceServEmit(value);
                },
                complete: () => {
                    this.swal.formSave('success');
                    this.table()?.queryAssistaces();
                    this.form()?.reset();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
            form?.markAllAsTouched();
            this.form()?.validate();
        }
    }

    update() {
        const form = this.formUpdate()?.form;
        if (form?.valid) {
            this.swal.loading();
            const data = this.local$.getEntity();
            this.HealthcareServices$.update(data!.id, form.value).subscribe({
                next: (value) => {
                    this.local$.assistanceServEmit(value);
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

    deleteAlert(data: HealthcareServices_APP | null) {
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

    delete(data: HealthcareServices_APP) {
        this.swal.loading();
        this.HealthcareServices$.delete(data.id).subscribe({
            next: () => {
                const text = data.name + ' ha sido liminado';
                this.swal.alertSimple(text, 'success');
                this.table()?.queryAssistaces();
                this.local$.assistanceServEmit(null);
            }
        });
    }

    cleanTdetail() {
        this.table()?.clean();
    }

    dataEdit(data: HealthcareServices_APP | null) {
        if (data) {
            const values: HealthcareServices_APPDTO = {
                appointments: data.appointments,
                consultations: data.consultations,
                doctor: data.doctor,
                historyTypeId: data.historyType.id,
                indicatorCode: data.indicatorCode,
                institutionActive: data.institutionActive,
                medicines: data.medicines,
                name: data.name,
                opportunityDays: data.opportunityDays,
                otherServices: data.otherServices,
                procedures: data.procedures,
                receive: data.receive,
                serviceLevelId: data.serviceLevel.id,
                serviceTypeId: data.serviceType.id,
                specialists: data.specialists,
                surgery: data.surgery
            }
            this.formUpdate()?.form.patchValue(values)
        }
    }

}
