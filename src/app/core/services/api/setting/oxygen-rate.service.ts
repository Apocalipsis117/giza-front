import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { OptionsForm, OxigenRateAPI, OxigenRateAPI_PAGE, TypeReturn } from '@interfaces/index';
import { OxigenRateAPP, OxigenRateAPP_PAGE } from '@interfaces/app';
import { OptionsControl, OxygenRate, OxygenRateDTO } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OxygenRateService {
    private http = inject(HttpClient);
    private api = {
        save: 'tarifa-oxigeno/save',
        list: 'tarifa-oxigeno/lista',
        page: 'tarifa-oxigeno/page',
    }

    post(data: any) {
        const api = queries.api(this.api.save);
        const dataPost = OxygenRateDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<OxigenRateAPP[]>;
    getAll(typeReturn: 'options'): Observable<OptionsForm[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<OxigenRateAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => OxygenRate.setProperty(x));
            })
        )
    }

    getAllPage(paramValue: any = null): Observable<OxigenRateAPP_PAGE> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<OxigenRateAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => OxygenRate.setProperty(item))
            }))
        )
    }
}
