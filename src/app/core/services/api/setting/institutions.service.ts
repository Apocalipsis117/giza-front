import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { Institutions_APP, Institutions_APPDTO, Institutions_ListResponse, Institutions_PageResponse, Institutions_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { Institutions, InstitutionsDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InstitutionsService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/instituciones',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: Institutions_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = InstitutionsDTO.setProperty(data);
        return this.http.post<Institutions_Response>(api, values).pipe(
            map(res => Institutions.setProperty(res.data))
        );
    }

    update(id: number, data: Institutions_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = InstitutionsDTO.setProperty(data);
        return this.http.put<Institutions_Response>(api, values).pipe(
            map(res => Institutions.setProperty(res.data))
        );
    }

    list(): Observable<Institutions_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<Institutions_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => Institutions.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<Institutions_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => Institutions.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<Institutions_Response>(api).pipe(
            map(res => Institutions.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
