import { Injectable } from '@angular/core';
import { OxygenRate_APP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalOxygenRateService {
    private oxigenRate$ = new Subject<OxygenRate_APP | null>();
    oxigenRate = this.oxigenRate$.asObservable();

    emit(data: OxygenRate_APP | null) {
        this.oxigenRate$.next(data);
    }
}
