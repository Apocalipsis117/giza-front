import { Injectable, signal } from '@angular/core';
import { HealthcareServices_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalAssistanceServiceService {
    getEntity = signal<HealthcareServices_APP|null>(null);
    private assistanceServSubject = new Subject<HealthcareServices_APP | null>();
    assistanceServ = this.assistanceServSubject.asObservable();

    assistanceServEmit(data: HealthcareServices_APP | null) {
        this.assistanceServSubject.next(data);
        this.getEntity.set(data);
    }
}
