import { Injectable } from '@angular/core';
import { OxigenRateAPP } from '@interfaces/app';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalOxygenRateService {
    private oxigenRate$ = new Subject<OxigenRateAPP | null>();
    oxigenRate = this.oxigenRate$.asObservable();

    emit(data: OxigenRateAPP | null) {
        this.oxigenRate$.next(data);
    }
}
