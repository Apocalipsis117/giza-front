import { Injectable, signal } from '@angular/core';
import { Contract_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalContractsService {
    getEntity = signal<Contract_APP|null>(null);
    private readEntity = new Subject<Contract_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    contractEmit(data: Contract_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
