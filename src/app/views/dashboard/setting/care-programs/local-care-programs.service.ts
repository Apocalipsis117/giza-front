import { Injectable, signal } from '@angular/core';
import { CarePrograms_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalCareProgramsService {
    getEntity = signal<CarePrograms_APP|null>(null);
    private readEntity = new Subject<CarePrograms_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: CarePrograms_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
