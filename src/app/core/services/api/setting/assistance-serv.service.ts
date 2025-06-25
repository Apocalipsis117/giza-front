import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { AssistanceServiceAPI, AssistanceServiceAPI_PAGE } from '@interfaces/index';
import { AssistanceServiceAPP, AssistanceServiceAPP_PAGE } from '@interfaces/app';
import { AsistanceServ, AssistanceServDTO } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssistanceServService {
    private http = inject(HttpClient);
    private api = {
        save: 's-asistenciales/save',
        list: 's-asistenciales/lista',
        page: 's-asistenciales/page'
    }

    post(data: any) {
        const api = queries.api(this.api.save);
        const values = AssistanceServDTO.setProperty(data);
        return this.http.post(api, values)
    }

    getAll(): Observable<AssistanceServiceAPP[]> {
        const api = queries.api(this.api.list);
        return this.http.get<AssistanceServiceAPI[]>(api).pipe(
            map(data => data.map(x => AsistanceServ.setProperty(x)))
        );
    }

    getAllPage(paramValue: any = null): Observable<AssistanceServiceAPP_PAGE> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<AssistanceServiceAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => AsistanceServ.setProperty(item))
            }))
        )
    }
}
