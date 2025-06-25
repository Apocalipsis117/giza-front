import { Injectable } from '@angular/core';
import { AdministrativeEntityAPP } from '@interfaces/app';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalAdministrativeEntitiesService {
    private readEntity = new Subject<AdministrativeEntityAPP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: AdministrativeEntityAPP | null) {
        this.readEntity.next(data);
    }
}
