import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiHelper, queries } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { FormControlOption, TypeRegime_Response, TypeRegime_APP, TypeReturn } from '@interfaces/index';
import { OptionsControl, TypeRegime } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeRegimeService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'regimen',
        list: 'lista',
    }

    list(): Observable<TypeRegime_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.list
        });
        return this.http.get<TypeRegime_Response>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.data.map(x => TypeRegime.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }
}
