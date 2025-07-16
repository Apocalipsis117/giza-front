import { action_singles_options } from '@actions/singles.action';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { FormControlOption, NameIdEntity_APP, NameIdEntity_ListResponse, NameIdEntity_Response, TypeReturn } from '@interfaces/index';
import { NameIdEntity, OptionsControl } from '@models/index';
import { Store } from '@ngrx/store';
import { select_singles } from '@selectors/singles.select';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PurposeConsultationService {
    private store = inject(Store);
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'finalidad-consulta',
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

    options(): Observable<FormControlOption[]> {
        return this.store.select(select_singles('purposeConsultation')).pipe(
            take(1),switchMap(data => {
                if (data.length > 0) {
                    return of(data);
                } else {
                    return this.list('options').pipe(
                        tap(data => this.store.dispatch(action_singles_options({ data, name: 'purposeConsultation' })))
                    );
                }
            })
        );
    }
}