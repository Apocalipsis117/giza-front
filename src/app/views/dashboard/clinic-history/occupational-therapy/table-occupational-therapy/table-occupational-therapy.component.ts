import { Component, inject, signal } from '@angular/core';
import { patientsApp } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { CardTablePatientComponent } from '@layouts/dashboard/cards/card-table-patient/card-table-patient.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { PatientsFakeService } from '@services/app';

@Component({
    selector: 'table-occupational-therapy',
    standalone: true,
    imports: [
        BladeTableComponent,
        CardTablePatientComponent,
        ButtonComponent
    ],
    templateUrl: './table-occupational-therapy.component.html'
})
export class TableOccupationalTherapyComponent {
    fakeService = inject(PatientsFakeService);

    patients = signal<patientsApp[]>([]);

    ngOnInit(): void {
        this.fakeService.items.subscribe(data => this.patients.set(data))
    }

}
