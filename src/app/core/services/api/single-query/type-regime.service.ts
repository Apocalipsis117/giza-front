import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { FormControlOption, TypeRegimeAPI, TypeRegimeAPP, TypeReturn } from '@interfaces/index';
import { OptionsControl, TypeRegime } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeRegimeService {
    private http = inject(HttpClient);
    private api = {
        list: 'regimen/lista'
    }

    getAll(): Observable<TypeRegimeAPP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<TypeRegimeAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nnombre));
                return data.map(x => TypeRegime.setProperty(x));
            })
        );
    }
}
