import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { FormControlOption, NameIdEntity_APP, NameIdEntity_ListResponse, NameIdEntity_Response, TypeReturn } from '@interfaces/index';
import { NameIdEntity, OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TypeRepresentativeService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'tipo-rep-ips',
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

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<NameIdEntity_Response>(api).pipe(
            map(res => NameIdEntity.setProperty(res.data))
        );
    }
}