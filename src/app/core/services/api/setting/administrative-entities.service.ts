import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { AdministrativeEntitiesAPI_PAGE } from '@interfaces/index';
import { AdministrativeEntitiesAPP_PAGE, AdministrativeEntitiesDTO_APP } from '@interfaces/app';
import { AdministrativeEntities, AdministrativeEntityDTO } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdministrativeEntitiesService {
    private http = inject(HttpClient);
    private api = {
        save: 'enti-adminis/save',
        list: 'enti-adminis/lista',
        page: 'enti-adminis/page',
    }

    post(data: AdministrativeEntitiesDTO_APP): Observable<any> {
        const api = queries.api(this.api.save);
        const values = AdministrativeEntityDTO.setProperty(data);
        return this.http.post(api, values)
    }

    getAllPage(paramValue: any = null): Observable<AdministrativeEntitiesAPP_PAGE> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<AdministrativeEntitiesAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => AdministrativeEntities.setProperty(item))
            }))
        )
    }
}
