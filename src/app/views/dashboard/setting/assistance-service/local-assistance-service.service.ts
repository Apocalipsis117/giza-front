import { Injectable } from '@angular/core';
import { AssistanceServiceAPP } from '@interfaces/app';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalAssistanceServiceService {
    private assistanceServSubject = new Subject<AssistanceServiceAPP | null>();
    assistanceServ = this.assistanceServSubject.asObservable();

    assistanceServEmit(data: AssistanceServiceAPP | null) {
        this.assistanceServSubject.next(data);
    }
}
