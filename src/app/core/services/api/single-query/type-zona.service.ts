import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { FormControlOption, TypeReturn, TypeZona_APP, TypeZona_ListResponse } from '@interfaces/index';
import { OptionsControl, TypeZone } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TypeZonaService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/usuarios',
        list: 'lista',
    };

    list(): Observable<TypeZona_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<TypeZona_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => TypeZone.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }
}