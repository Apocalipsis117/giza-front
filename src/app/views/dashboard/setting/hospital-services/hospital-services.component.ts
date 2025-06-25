import { Component, inject, signal, ViewChild } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableHospitalServicesComponent } from './table-hospital-services/table-hospital-services.component';
import { FormHospitalServicesComponent } from './form-hospital-services/form-hospital-services.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { ActionName, BarActions, HospitalServiceAPP, HospitalServiceDTO_APP, IForm } from '@interfaces/index';
import { SweetalertService } from '@services/app';
import { TdetailHospitalServicesComponent } from './tdetail-hospital-services/tdetail-hospital-services.component';
import { HospitalServService } from '@services/api';

@Component({
    selector: 'hospital-services',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableHospitalServicesComponent,
        FormHospitalServicesComponent,
        TdetailHospitalServicesComponent
    ],
    templateUrl: './hospital-services.component.html'
})
export class HospitalServicesComponent {
    @ViewChild('table') table!: TableHospitalServicesComponent;
    hospitalServ = inject(HospitalServService);
    swal = inject(SweetalertService);
    fb = inject(FormBuilder);
    hospitalServList = signal<HospitalServiceAPP[]>([]);
    form!: FormGroup;

    actionDetail: BarActions = {
        delete: true,
        edit: true,
        clean: true
    }

    formHserviceCLone: HospitalServiceDTO_APP;
    formHservice: IForm<HospitalServiceDTO_APP> = {
        name: ['', Validators.required],
        bedCount: [''],
        costCenterId: [''],
        genderId: [''],
        isActive: [false],
        maxAge: [''],
        minAge: [''],
        scopeId: ['']
    }

    constructor() {
        this.form = this.fb.group(this.formHservice);
        this.formHserviceCLone = ngFormHelper.unboxProperties(this.formHservice)
    }

    ngOnInit(): void {
        this.queryHospitalServ();
    }

    queryHospitalServ() {
        this.hospitalServ.getAll().subscribe((data) => this.hospitalServList.set(data));
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
        else if (e === 'clean') this.cleanTdetail();
    }

    save() {
        if (this.form.valid) {
            this.swal.loading();
            this.hospitalServ.post(this.form.value).subscribe({
                next: () => {
                    this.queryHospitalServ();
                    this.swal.formSave('success');
                    this.reset();
                    // this.showTab(1);
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.formHserviceCLone);
    }

    cleanTdetail() {
        this.table.clean();
    }
}
