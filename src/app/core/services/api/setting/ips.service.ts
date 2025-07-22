import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { FormControlOption, Ips_APP, Ips_APPDTO, Ips_ListResponse, Ips_PageResponse, Ips_Response, TypeReturn } from '@interfaces/index';
import { Ips, IpsDTO, OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IpsService {
private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/ips',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: Ips_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = IpsDTO.setProperty(data);
        return this.http.post<Ips_Response>(api, values).pipe(
            map(res => Ips.setProperty(res.data))
        );
    }

    update(uuid: string, data: Ips_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        const values = IpsDTO.setProperty(data);
        return this.http.put<Ips_Response>(api, values).pipe(
            map(res => Ips.setProperty(res.data))
        );
    }

    list(): Observable<Ips_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<Ips_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.uuid, x.nombre));
                return res.data.map(x => Ips.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<Ips_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => Ips.setProperty(item))
            }))
        );
    }

    getBy(uuid: string) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        return this.http.get<Ips_Response>(api).pipe(
            map(res => Ips.setProperty(res.data))
        );
    }

    delete(uuid: string) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}