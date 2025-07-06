import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { NameIdEntity_APP, NameIdEntity_APPDTO, NameIdEntity_ListResponse, NameIdEntity_PageResponse, NameIdEntity_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { NameIdEntity, NameIdEntityDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdverseEventsService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/eventos-adversos',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: NameIdEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = NameIdEntityDTO.setProperty(data);
        return this.http.post<NameIdEntity_Response>(api, values).pipe(
            map(res => NameIdEntity.setProperty(res.data))
        );
    }

    update(id: number, data: NameIdEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = NameIdEntityDTO.setProperty(data);
        return this.http.put<NameIdEntity_Response>(api, values).pipe(
            map(res => NameIdEntity.setProperty(res.data))
        );
    }

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

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<NameIdEntity_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => NameIdEntity.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<NameIdEntity_Response>(api).pipe(
            map(res => NameIdEntity.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
