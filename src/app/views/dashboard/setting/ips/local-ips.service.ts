import { Injectable } from '@angular/core';
import { ActionName } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalIpsService {
    private evetnForm$ = new Subject<ActionName | null>();
    watchEventForm = this.evetnForm$.asObservable();

    emit(action: ActionName | null) {
        this.evetnForm$.next(action);
    }
}
