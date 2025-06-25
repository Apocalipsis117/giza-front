import { Injectable } from '@angular/core';
import { DiagnosisAPP } from '@interfaces/app';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalDiagnosisService {
    private data$ = new Subject<DiagnosisAPP | null>();
    watchData = this.data$.asObservable();

    emitDiagnosis(data: DiagnosisAPP | null) {
        this.data$.next(data);
    }
}
