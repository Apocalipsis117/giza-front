import { Component, inject, signal } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { TableVehiclesComponent } from './table-vehicles/table-vehicles.component';
import { FormVehiclesComponent } from './form-vehicles/form-vehicles.component';
import { IForm, VehicleAPP, VehiclesTDO_APP } from '@interfaces/index';
import { SweetalertService } from '@services/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { NoteComponent } from '@layouts/shared/note/note.component';
import { VehiclesService } from '@services/api';

@Component({
    selector: 'page-vehicles',
    standalone: true,
    templateUrl: './vehicles.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableVehiclesComponent,
        FormVehiclesComponent,
        NoteComponent
    ]
})
export class VehiclesComponent {
    swal = inject(SweetalertService);
    fb = inject(FormBuilder);
    vehicleServ = inject(VehiclesService);
    vehicles = signal<VehicleAPP[]>([]);

    form: FormGroup;
    vehicleFormClone: VehiclesTDO_APP;
    vehicleForm: IForm<VehiclesTDO_APP> = {
        activityId: [''],
        brand: [''],
        description: [''],
        licensePlate: [''],
        model: [''],
        status: [true],
        vehicleTypeId: ['', Validators.required]
    }

    constructor() {
        this.form = this.fb.group(this.vehicleForm);
        this.vehicleFormClone = ngFormHelper.unboxProperties(this.vehicleForm);
    }

    ngOnInit(): void {
        this.queryVehicleList()
    }

    queryVehicleList() {
        this.vehicleServ.getAll().subscribe(data => this.vehicles.set(data))
    }

    barAction(e: string) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        if(this.form.valid) {
            this.swal.loading();
            this.vehicleServ.post(this.form.value).subscribe({
                next: (data) => {
                    this.queryVehicleList();
                    this.swal.formSave('success');
                    this.reset();                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.patchValue(this.vehicleFormClone);
    }
}
