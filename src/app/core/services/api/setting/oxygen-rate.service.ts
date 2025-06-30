import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { FormControlOption, OxygenRate_APP, OxygenRate_ListResponse, OxygenRate_PageAPP, OxygenRate_PageResponse, TypeReturn } from '@interfaces/index';
import { OptionsControl, OxygenRate, OxygenRateDTO } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OxygenRateService {
    private http = inject(HttpClient);
    private api = {
        base: 'config/tarifa-oxigeno',
        save: 'save',
        list: 'lista',
        page: 'page',
    }

    post(data: any) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.save
        });
        const json = OxygenRateDTO.setProperty(data);
        return this.http.post(api, json);
    }

    list(): Observable<OxygenRate_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.list
        });
        return this.http.get<OxygenRate_ListResponse>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.data.map(x => OxygenRate.setProperty(x));
            }),
            catchError(() => of([]))
        )
    }

    page(paramValue: any = null): Observable<OxygenRate_PageAPP> {
        const api = apiHelper.api(this.api.base, {
            path: this.api.list,
            params: paramValue
        });
        return this.http.get<OxygenRate_PageResponse>(api).pipe(
            map(data => ({
                ...data.data,
                content: data.data.content.map(item => OxygenRate.setProperty(item))
            }))
        )
    }
}
