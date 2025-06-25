import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { CupsAPI, CupsAPI_PAGE } from '@interfaces/index';
import { CupsAPP_PAGE, CupsAPP, CupsDTO_APP } from '@interfaces/app';
import { Cup, CupDTO } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CupService {
    private http = inject(HttpClient);
    private api = {
        save: 'cups/save',
        list: 'cups/lista',
        page: 'cups/page'
    }

    post(data: CupsDTO_APP) {
        const api = queries.api(this.api.save);
        const dataPost = CupDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<CupsAPP[]> {
        const api = queries.api(this.api.list);
        return this.http.get<CupsAPI[]>(api).pipe(
            map(data => data.map(x => Cup.setProperty(x)))
        );
    }

    getAllPage(paramValue: any = null): Observable<CupsAPP_PAGE> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<CupsAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => Cup.setProperty(item))
            }))
        )
    }
}
