import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { AdministrativeEntity_APP, AdministrativeEntity_APPDTO, AdministrativeEntity_ListResponse, AdministrativeEntity_PageResponse, AdministrativeEntity_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { AdministrativeEntity, AdministrativeEntityDTO, OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdministrativeEntitiesService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/entidades-administradoras',
        save: 'save',
        list: 'lista',
        page: 'page',
    }

    post(data: AdministrativeEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.save
        });
        const values = AdministrativeEntityDTO.setProperty(data);
        return this.http.post<AdministrativeEntity_Response>(api, values).pipe(
            map(data => AdministrativeEntity.setProperty(data.data))
        )
    }

    update(id: number, data: AdministrativeEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, {
            path: id
        });
        const values = AdministrativeEntityDTO.setProperty(data);
        return this.http.put<AdministrativeEntity_Response>(api, values).pipe(
            map(data => AdministrativeEntity.setProperty(data.data))
        )
    }

    list(): Observable<AdministrativeEntity_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.list
        });
        return this.http.get<AdministrativeEntity_ListResponse>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.data.map(x => AdministrativeEntity.setProperty(x));
            }),
            catchError(() => of([]))
        )
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.page,
            params: paramValue
        });
        return this.http.get<AdministrativeEntity_PageResponse>(api).pipe(
            map(data => ({
                ...data.data,
                content: data.data.content.map(item => AdministrativeEntity.setProperty(item))
            }))
        )
    }

    getBy(uuid: number) {
        const api = apiHelper.api(this.api.base, {
            path: uuid
        });
        return this.http.get<AdministrativeEntity_Response>(api).pipe(
            map(data =>  AdministrativeEntity.setProperty(data.data))
        )
    }

    delete(uuid: number) {
        const api = apiHelper.api(this.api.base, {
            path: uuid
        });
        return this.http.delete<ResponseAPI<string>>(api)
    }
}
