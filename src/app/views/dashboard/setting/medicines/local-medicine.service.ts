import { Injectable } from '@angular/core';
import { MedicineAPP } from '@interfaces/app';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalMedicineService {
    private medicine$ = new Subject<MedicineAPP | null>();
    watchData = this.medicine$.asObservable();

    emit(data: MedicineAPP | null) {
        this.medicine$.next(data);
    }
}
