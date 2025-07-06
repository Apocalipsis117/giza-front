import { Injectable, signal } from '@angular/core';
import { Institutions_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalInstitutionsService {
    getEntity = signal<Institutions_APP|null>(null);
    private readEntity = new Subject<Institutions_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: Institutions_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
