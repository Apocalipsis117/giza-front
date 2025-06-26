import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { FormControlOption, TypeRepresentativeAPI, TypeRepresentativeAPP, TypeReturn } from '@interfaces/index';
import { OptionsControl, TypeRepresentative } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeRepresentativeService {
    private http = inject(HttpClient);

    getAll(): Observable<TypeRepresentativeAPP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api('tipo-rep-ips/lista');
        return this.http.get<TypeRepresentativeAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.codigo_id, x.nombre));
                return data.map(x => TypeRepresentative.setProperty(x));
            })
        );
    }
}
