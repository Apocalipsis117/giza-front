import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { AdministrativeEntity_PageAPI, AdministrativeEntity_API, AdministrativeEntity_APPDTO, AdministrativeEntity_Response } from '@interfaces/index';
import { AdministrativeEntity, AdministrativeEntityDTO } from '@models/index';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdministrativeEntitiesService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'entidades-administradoras',
        save: 'save',
        list: 'lista',
        page: 'page',
    }

    post(data: AdministrativeEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.save
        });
        const values = AdministrativeEntityDTO.setProperty(data);
        return this.http.post(api, values)
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.page,
            params: paramValue
        });
        return this.http.get<AdministrativeEntity_PageAPI>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => AdministrativeEntity.setProperty(item))
            }))
        )
    }

    getBy(uuid: string) {
        const api = apiHelper.api(this.api.base, {
            path: uuid
        });
        return this.http.get<AdministrativeEntity_API>(api).pipe(
            map(data =>  AdministrativeEntity.setProperty(data))
        )
    }

    delete(uuid: string) {
        const api = apiHelper.api(this.api.base, {
            path: uuid
        });
        return this.http.delete<AdministrativeEntity_Response>(api).pipe(
            map(data =>  AdministrativeEntity.setProperty(data.data))
        )
    }
}
