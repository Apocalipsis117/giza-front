import { Injectable } from '@angular/core';
import { Medicine_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalMedicineService {
    private medicine$ = new Subject<Medicine_APP | null>();
    watchData = this.medicine$.asObservable();

    emit(data: Medicine_APP | null) {
        this.medicine$.next(data);
    }
}
