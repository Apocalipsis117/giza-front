import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BarToolControllerService {
    private emitAction = new Subject<string>();
    action = this.emitAction.asObservable();

    changeAction(action: string) {
        this.emitAction.next(action);
    }
}
