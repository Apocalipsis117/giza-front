import { Injectable, signal } from '@angular/core';
import { DiagnosisGroup_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalDiagnosisGroupService {
    getEntity = signal<DiagnosisGroup_APP|null>(null);
    private readEntity = new Subject<DiagnosisGroup_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: DiagnosisGroup_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
