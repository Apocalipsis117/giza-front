import { Injectable, signal } from '@angular/core';
import { HospitalService_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalHospitalServService {
    getEntity = signal<HospitalService_APP|null>(null);
    private assistanceServSubject = new Subject<HospitalService_APP | null>();
    assistanceServ = this.assistanceServSubject.asObservable();

    assistanceServEmit(data: HospitalService_APP | null) {
        this.assistanceServSubject.next(data);
        this.getEntity.set(data);
    }
}
