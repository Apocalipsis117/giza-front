import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { Apartment_APP, Apartment_ListResponse, DataAssociated, FormControlOption, Municipality_APP, Municipality_ListResponse, TypeReturn } from '@interfaces/index';
import { Apartment, OptionsControl } from '@models/index';
import { Store } from '@ngrx/store';
import { select_appGisa_countries } from '@selectors/app-gisa.select';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApartmentCitiesService {
    private store = inject(Store);
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
    municipalies(typeReturn: 'options'): Observable<FormControlOption<DataAssociated>[]>;
    municipalies(typeReturn: TypeReturn = null) {
        const api = queries.api('municipios/lista');
        return this.http.get<Municipality_ListResponse>(api).pipe(
            map(data => {
                if (typeReturn === 'options') {
                    return data.data.map(x => {
                        const data: DataAssociated = { id: x.departamento.id };
                        return OptionsControl.setProperty(x.id, x.nombre, data);
                    })
                };
                return data.data.map(x => Apartment.setProperty(x));
            }),
        );
    }

    filterByDepartment(id: number): Observable<FormControlOption[]> {
        return this.store.select(select_appGisa_countries).pipe(
            map(data => data.minicipalies.filter(x => x.data?.id === id))
        );
    }
}
