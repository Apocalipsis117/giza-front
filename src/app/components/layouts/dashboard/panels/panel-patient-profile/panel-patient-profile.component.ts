import { Component, inject, signal } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { patientsApp } from '@interfaces/index';
import { AppPatientProfileService } from '@services/app';

@Component({
    selector: 'panel-patient-profile',
    standalone: true,
    imports: [
        DirectivesModule
    ],
    templateUrl: './panel-patient-profile.component.html'
})
export class PanelPatientProfileComponent {
    patientProfile = inject(AppPatientProfileService);
    patient = signal<patientsApp | null>(null)

    ngOnInit(): void {
        this.patientProfile.patient.subscribe(data => {
            this.patient.set(data);
        })
    }

    get name() {
        return this.patient() ? this.patient()?.name : '';
    }

    get avatar() {
        return this.patient() ? this.patient()?.avatar : '';
    }

    get age() {
        return this.patient() ? this.patient()?.age : 0;
    }

    get gender() {
        return this.patient() ? this.patient()?.gender : '';
    }
}
