import { Injectable, signal } from '@angular/core';
import { Ips_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalIpsService {
    getEntity = signal<Ips_APP | null>(null);
    private readEntity = new Subject<Ips_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: Ips_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
