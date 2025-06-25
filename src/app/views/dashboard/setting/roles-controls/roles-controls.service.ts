import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RolesControlsService {
    private formRoleSave = new Subject<any>();
    formRoleSaveObs = this.formRoleSave.asObservable();

    emitFormSave(value: any) {
        this.formRoleSave.next(value);
    }
}
