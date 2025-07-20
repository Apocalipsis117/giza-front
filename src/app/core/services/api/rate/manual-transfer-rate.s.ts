import { action_tariff_options } from '@actions/tariff.action';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { NameStateEntity_APP, NameStateEntity_APPDTO, NameStateEntity_ListResponse, NameStateEntity_PageResponse, NameStateEntity_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { NameStateEntity, NameStateEntityDTO, OptionsControl } from '@models/index';
import { Store } from '@ngrx/store';
import { select_tariff } from '@selectors/tariff.select';
import { Observable, catchError, map, of, shareReplay, switchMap, take, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ManualTransferRateService {
    private store = inject(Store);
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'm-tarifa-traslado',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: NameStateEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = NameStateEntityDTO.setProperty(data);
        return this.http.post<NameStateEntity_Response>(api, values).pipe(
            map(res => NameStateEntity.setProperty(res.data))
        );
    }

    update(id: number, data: NameStateEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = NameStateEntityDTO.setProperty(data);
        return this.http.put<NameStateEntity_Response>(api, values).pipe(
            map(res => NameStateEntity.setProperty(res.data))
        );
    }

    list(): Observable<NameStateEntity_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<NameStateEntity_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => NameStateEntity.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<NameStateEntity_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => NameStateEntity.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<NameStateEntity_Response>(api).pipe(
            map(res => NameStateEntity.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }

    options(): Observable<FormControlOption[]> {
        return this.store.select(select_tariff('mTransferRate')).pipe(
            take(1),
            switchMap(data => {
                if (data.length > 0) {
                    return of(data);
                } else {
                    return this.list('options').pipe(
                        tap(data => this.store.dispatch(action_tariff_options({ data, name: 'mTransferRate' })))
                    );
                }
            }),
            shareReplay(1)
        );
    }
}