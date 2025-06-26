import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormControlOption, TypeReturn, TypeVehicleAPI, TypeVehicleAPP } from '@interfaces/index';
import { NamedEntity, OptionsControl } from '@models/index';
import { Observable, map, of } from 'rxjs';
import brandsVehicles from '@local-data/app/brands-vehicles.json';
import { queries } from '@helpers/index';

@Injectable({
    providedIn: 'root'
})
export class TypeVehicleService {
    private http = inject(HttpClient);

    getAll(): Observable<TypeVehicleAPP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api('tipo-vehiculo/lista');
        return this.http.get<TypeVehicleAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => NamedEntity.setProperty(x));
            })
        );
    }

    brands(): Observable<any[]>;
    brands(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    brands(typeReturn: TypeReturn = null) {
        return of(brandsVehicles.data.brands).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.name));
                return data;
            })
        );
    }
}
