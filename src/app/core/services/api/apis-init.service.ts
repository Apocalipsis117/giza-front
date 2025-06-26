import { inject, Injectable } from '@angular/core';
import { ApartmentCitiesService } from '@services/api';
import { RxAppGisaService } from '@services/app';
import { catchError, forkJoin, of, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApisInitService {
    private readonly rxApp$ = inject(RxAppGisaService);
    private readonly countries$ = inject(ApartmentCitiesService);

    initAPIS() {
        const obs = forkJoin({
            apartaments: this.countries$.apartaments("options").pipe(catchError(() => of([]))),
            municipalies: this.countries$.municipalies("options").pipe(catchError(() => of([]))),
        });

        obs.pipe(take(1)).subscribe({
            next: (value) => {
                this.rxApp$.dispachApartaments(value.apartaments);
                this.rxApp$.dispachMinicipalies(value.municipalies);
            }
        });
    }


}
