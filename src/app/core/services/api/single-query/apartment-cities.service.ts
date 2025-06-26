import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { Apartment_APP, Apartment_ListResponse, FormControlOption, Municipality_APP, Municipality_ListResponse, TypeReturn } from '@interfaces/index';
import { Apartment, OptionsControl } from '@models/index';
import { Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApartmentCitiesService {
    private http = inject(HttpClient);

    apartaments(): Observable<Apartment_APP[]>;
    apartaments(typeReturn: 'options'): Observable<FormControlOption[]>;
    apartaments(typeReturn: TypeReturn = null) {
        const api = queries.api('departamentos/lista');
        return this.http.get<Apartment_ListResponse>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.data.map(x => Apartment.setProperty(x));
            })
        );
    }

    municipalies(): Observable<Municipality_APP[]>;
    municipalies(typeReturn: 'options'): Observable<FormControlOption[]>;
    municipalies(typeReturn: TypeReturn = null) {
        const api = queries.api('municipios/lista');
        return this.http.get<Municipality_ListResponse>(api).pipe(
            map(data => {
                if (typeReturn === 'options') {
                    return data.data.map(x => {
                        const data = { apartamentID: 1 };
                        return OptionsControl.setProperty(x.id, x.nombre, data);
                    })
                };
                return data.data.map(x => Apartment.setProperty(x));
            }),
        );
    }
}
