import { Injectable } from '@angular/core';
import { HospitalServiceAPP } from '@interfaces/index';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalHospitalServService {
    private hospitalServ$ = new Subject<HospitalServiceAPP | null>();
    hospitalServ = this.hospitalServ$.asObservable();

    emit(data: HospitalServiceAPP | null) {
        this.hospitalServ$.next(data);
    }
}
