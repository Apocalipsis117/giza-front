import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { NameIdEntity_APP, FormControlOption, TypeReturn, NameIdEntity_API } from '@interfaces/index';
import { OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';
import { NameIdEntity } from 'src/app/core/models/single-query/name-entity.m';

@Injectable({
    providedIn: 'root'
})
export class LevelComplexityService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'ncomplejidad',
        list: 'lista',
    };

    list(): Observable<NameIdEntity_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<ResponseAPI<NameIdEntity_API[]>>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => NameIdEntity.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }
}
