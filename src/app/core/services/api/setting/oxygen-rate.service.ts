import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { OxygenRate_APP, OxygenRate_APPDTO, OxygenRate_ListResponse, OxygenRate_PageResponse, OxygenRate_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { OxygenRate, OxygenRateDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OxygenRateService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/tarifa-oxigeno',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: OxygenRate_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = OxygenRateDTO.setProperty(data);
        return this.http.post<OxygenRate_Response>(api, values).pipe(
            map(res => OxygenRate.setProperty(res.data))
        );
    }

    update(id: number, data: OxygenRate_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = OxygenRateDTO.setProperty(data);
        return this.http.put<OxygenRate_Response>(api, values).pipe(
            map(res => OxygenRate.setProperty(res.data))
        );
    }

    list(): Observable<OxygenRate_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<OxygenRate_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => OxygenRate.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<OxygenRate_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => OxygenRate.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<OxygenRate_Response>(api).pipe(
            map(res => OxygenRate.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
