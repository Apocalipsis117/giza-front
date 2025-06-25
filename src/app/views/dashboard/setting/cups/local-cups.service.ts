import { Injectable } from '@angular/core';
import { CupsAPP } from '@interfaces/app';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalCupsService {
    private cup$ = new Subject<CupsAPP | null>();
    watchCup = this.cup$.asObservable();

    emitCup(data: CupsAPP | null) {
        this.cup$.next(data);
    }
}
