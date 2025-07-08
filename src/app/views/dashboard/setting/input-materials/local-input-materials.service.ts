import { Injectable, signal } from '@angular/core';
import { InputMaterials_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalInputMaterialsService {
    getEntity = signal<InputMaterials_APP | null>(null);
    private readEntity = new Subject<InputMaterials_APP | null>();
    readEntity$ = this.readEntity.asObservable();

    entityEmit(data: InputMaterials_APP | null) {
        this.readEntity.next(data);
        this.getEntity.set(data);
    }
}
