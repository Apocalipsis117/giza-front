import { Component, inject, viewChild } from '@angular/core';
import { ActionName } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { BladeBoxUiComponent } from '@layouts/dashboard/blades/blade-box-ui/blade-box-ui.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { SweetalertService, TestService } from '@services/app';
import { MedicalAgendaFormInternComponent } from './medical-agenda-form-intern/medical-agenda-form-intern.component';
import { MedicalAgendaFormComponent } from './medical-agenda-form/medical-agenda-form.component';
import { MedicalAgendaTableComponent } from './medical-agenda-table/medical-agenda-table.component';

@Component({
    selector: 'medical-agenda',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        MedicalAgendaFormComponent,
        MedicalAgendaTableComponent,
        BladeBoxUiComponent,
        BladeBoxUiComponent,
        ButtonComponent,
        MedicalAgendaFormInternComponent,
        BladeBoxTitleComponent
    ],
    templateUrl: './medical-agenda.component.html'
})
export class MedicalAgendaComponent {
    private formMedicalAgenda = viewChild('formMedicalAgenda', { read: MedicalAgendaFormComponent });
    private formMedicalIntern = viewChild('formMedicalIntern', { read: MedicalAgendaFormInternComponent });
    private readonly testServ = inject(TestService);
    private swal = inject(SweetalertService);

    barActionAgenda(e: ActionName) {
        if (e === 'save') this.saveAgenda();
        else if (e === 'reset') this.resetAgenda();
    }

    barActionIntern(e: ActionName) {
        if (e === 'add') this.saveIntern();
        else if (e === 'reset') this.resetIntern();
    }

    saveAgenda() {
        const formMedicalAgenda = this.formMedicalAgenda()?.form;
        if (formMedicalAgenda?.valid) {
            const dto = {
                ...formMedicalAgenda.value
            }
            this.swal.loading();
            this.testServ.post(dto).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.resetAgenda()
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    saveIntern() {
        const formMedicalIntern = this.formMedicalIntern()?.form;
        if (formMedicalIntern?.valid) {
            const dto = {
                ...formMedicalIntern.value,
            }
            this.swal.loading();
            this.testServ.post(dto).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.resetIntern()
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    resetAgenda() {
        this.formMedicalAgenda()?.reset();
    }

    resetIntern() {
        this.formMedicalAgenda()?.reset();
    }
}
