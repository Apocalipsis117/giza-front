import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { ApartmentCitiesAPI, ApartmentCitiesAPP, CitiesOptionForm, TypeReturn } from '@interfaces/index';
import { ApartmentCities, ApartmentCitiesOptions } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApartmentCitiesService {
    private http = inject(HttpClient);

    getAll(): Observable<ApartmentCitiesAPP[]>;
    getAll(typeReturn: 'options'): Observable<CitiesOptionForm[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api('departamentos/lista');
        return this.http.get<ApartmentCitiesAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => ApartmentCitiesOptions.setProperty(x));
                return data.map(x => ApartmentCities.setProperty(x));
            })
        );
    }
}
