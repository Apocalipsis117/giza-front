import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { FormControlOption, NameIdEntity_APP, NameIdEntity_ListResponse, TypeReturn } from '@interfaces/index';
import { NameIdEntity, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GroupQxService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'grupo-qx',
        list: 'lista',
    };

    list(): Observable<NameIdEntity_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<NameIdEntity_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => NameIdEntity.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }
}
