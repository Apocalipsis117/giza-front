import { Component, inject, viewChild } from '@angular/core';
import { ActionName, BarActions } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { NoteComponent } from '@layouts/shared/note/note.component';
import { OxygenRateService } from '@services/api';
import { SweetalertService } from '@services/app';
import { FormOxygenRateComponent } from './form-oxygen-rate/form-oxygen-rate.component';
import { TableOxygenRateComponent } from './table-oxygen-rate/table-oxygen-rate.component';
import { TdetailOxygenRateComponent } from './tdetail-oxygen-rate/tdetail-oxygen-rate.component';

@Component({
    selector: 'app-oxygen-rate',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableOxygenRateComponent,
        FormOxygenRateComponent,
        TdetailOxygenRateComponent,
        NoteComponent
    ],
    templateUrl: './oxygen-rate.component.html'
})
export class OxygenRateComponent {
    private form = viewChild('form', { read: FormOxygenRateComponent });
    private table = viewChild('table', { read: TableOxygenRateComponent });
    private readonly oxigen$ = inject(OxygenRateService);
    swal = inject(SweetalertService);
    barActions: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    barAction(value: ActionName) {
        if (value === 'save') this.save();
        else if (value === 'reset') this.form()?.reset();
        else if (value === 'clean') this.cleanTdetail();
    }

    save() {
        const form = this.form()?.form;
        if (form?.valid) {
            this.swal.loading();
            this.oxigen$.post(form.value).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.form()?.reset();
                    this.table()?.queryOxigenrates();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    cleanTdetail() {
        this.table()?.clean();
    }
}
