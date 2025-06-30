import { Injectable, signal } from '@angular/core';
import { AdministrativeEntity_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalAdministrativeEntitiesService {
    getEntity = signal<AdministrativeEntity_APP|null>(null);
    private readEntity = new Subject<AdministrativeEntity_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: AdministrativeEntity_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
