import { Injectable } from '@angular/core';
import { patientsApp } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppPatientProfileService {
    private emitParient = new Subject<patientsApp | null>();
    patient = this.emitParient.asObservable();

    setPatient(data: patientsApp) {
        this.emitParient.next(data);
    }
}
