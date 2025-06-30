import { Component, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ngFormHelper, queries } from '@helpers/index';
import { ActionName, BarActions, IForm, OxygenRate_APPDTO, OxygenRate_PageAPP } from '@interfaces/index';
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
    @ViewChild('table') table!: TableOxygenRateComponent;
    fb = inject(FormBuilder);
    oxigenServ = inject(OxygenRateService);
    swal = inject(SweetalertService);
    oxigenRate = signal<OxygenRate_PageAPP | null>(null);
    form: FormGroup;
    barActions: BarActions = {
        edit: true,
        delete: true,
        clean: true
    }
    oxygenFormClone: OxygenRate_APPDTO;
    oxygenForm: IForm<OxygenRate_APPDTO> = {
        medicineId: [''],
        name: [''],
        status: [true],
        value: [''] // int
    }
    paramPaginate = signal<any>(queries.paramsPage);

    constructor() {
        this.form = this.fb.group(this.oxygenForm);
        this.oxygenFormClone = ngFormHelper.unboxProperties(this.oxygenForm)
    }

    ngOnInit(): void {
        this.queryOxigenrates();
    }

    queryOxigenrates() {
        this.oxigenServ.page(this.paramPaginate()).subscribe(data => this.oxigenRate.set(data));
    }

    barAction(value: ActionName) {
        if (value === 'save') this.save();
        else if (value === 'reset') this.reset();
        else if (value === 'clean') this.cleanTdetail();
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.oxigenServ.post(this.form.value).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.reset();
                    this.queryOxigenrates();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.oxygenFormClone);
    }

    cleanTdetail() {
        this.table.clean();
    }
    paginate(e: any) {
        this.paramPaginate.set(e);
        this.queryOxigenrates();
    }
}
