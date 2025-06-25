import { Component, inject, signal } from '@angular/core';
import { patientsApp } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { CardTablePatientComponent } from '@layouts/dashboard/cards/card-table-patient/card-table-patient.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { AppPatientProfileService, PatientsFakeService } from '@services/app';
import { TformPatientsEmergencyComponent } from "../tform-patients-emergency/tform-patients-emergency.component";

@Component({
    selector: 'table-patients-emergency',
    standalone: true,
    templateUrl: './table-patients-emergency.component.html',
    imports: [
        BladeTableComponent,
        CardTablePatientComponent,
        TformPatientsEmergencyComponent,
        ButtonComponent
    ]
})
export class TablePatientsEmergencyComponent {
    fake = inject(PatientsFakeService);
    patientProfile = inject(AppPatientProfileService);
    patienst = signal<patientsApp[]>([]);

    ngOnInit(): void {
        this.fake.items.subscribe(data => this.patienst.set(data));
    }

    emitPatient(data: patientsApp) {
        this.patientProfile.setPatient(data);
    }
}
