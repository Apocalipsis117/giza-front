import { Injectable, signal } from '@angular/core';
import { Diagnosis_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalDiagnosisService {
    getEntity = signal<Diagnosis_APP|null>(null);
    private readEntity = new Subject<Diagnosis_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: Diagnosis_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
