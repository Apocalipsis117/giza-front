import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { FormControlOption, NameIdEntity_API, NameIdEntity_APP, TypeReturn } from '@interfaces/index';
import { OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';
import { NameIdEntity } from 'src/app/core/models/single-query/name-entity.m';

@Injectable({
    providedIn: 'root'
})
export class GroupSoatService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'grupo-soat',
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
