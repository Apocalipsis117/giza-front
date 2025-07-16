import { action_singles_options } from '@actions/singles.action';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { FormControlOption, NamedEntityAPI, NamedEntityAPP, TypeReturn } from '@interfaces/index';
import { NamedEntity, OptionsControl } from '@models/index';
import { Store } from '@ngrx/store';
import { select_singles } from '@selectors/singles.select';
import { Observable, catchError, map, of, switchMap, take, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LevelServiceService {
    private store = inject(Store);
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'n-servicio',
        list: 'lista',
    }

    list(): Observable<NamedEntityAPP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.list
        });
        return this.http.get<ResponseAPI<NamedEntityAPI[]>>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.data.map(x => NamedEntity.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    options(): Observable<FormControlOption[]> {
        return this.store.select(select_singles('levelService')).pipe(
            take(1),
            switchMap(data => {
                if (data.length > 0) {
                    return of(data);
                } else {
                    return this.list('options').pipe(
                        tap(data => this.store.dispatch(action_singles_options({ data, name: 'levelService' })))
                    );
                }
            })
        );
    }
}
