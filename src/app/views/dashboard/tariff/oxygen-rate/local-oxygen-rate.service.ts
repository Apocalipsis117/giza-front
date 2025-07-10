import { Injectable, signal } from '@angular/core';
import { OxygenRate_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalOxygenRateService {
    getEntity = signal<OxygenRate_APP|null>(null);
    private readEntity = new Subject<OxygenRate_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: OxygenRate_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
