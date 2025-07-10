import { Injectable, signal } from '@angular/core';
import { Medicine_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalMedicineService {
    getEntity = signal<Medicine_APP|null>(null);
    private readEntity = new Subject<Medicine_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: Medicine_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
