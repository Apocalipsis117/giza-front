import { Injectable } from '@angular/core';
import { AdministrativeEntity_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalAdministrativeEntitiesService {
    private readEntity = new Subject<AdministrativeEntity_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: AdministrativeEntity_APP | null) {
        this.readEntity.next(data);
    }
}
