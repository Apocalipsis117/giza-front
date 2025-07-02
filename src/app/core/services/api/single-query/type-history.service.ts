import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { TypeHistory_APP, TypeHistory_ListResponse, FormControlOption, TypeReturn } from '@interfaces/index';
import { TypeHistory, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TypeHistoryService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'tipo-historia',
        list: 'lista',
    };

    list(): Observable<TypeHistory_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<TypeHistory_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => TypeHistory.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }
}
