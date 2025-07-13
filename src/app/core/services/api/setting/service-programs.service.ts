import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { ServicePrograms_APP, ServicePrograms_APPDTO, ServicePrograms_ListResponse, ServicePrograms_PageResponse, ServicePrograms_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { ServicePrograms, ServiceProgramsDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceProgramsService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/usuarios',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: ServicePrograms_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = ServiceProgramsDTO.setProperty(data);
        return this.http.post<ServicePrograms_Response>(api, values).pipe(
            map(res => ServicePrograms.setProperty(res.data))
        );
    }

    update(id: number, data: ServicePrograms_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = ServiceProgramsDTO.setProperty(data);
        return this.http.put<ServicePrograms_Response>(api, values).pipe(
            map(res => ServicePrograms.setProperty(res.data))
        );
    }

    list(): Observable<ServicePrograms_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<ServicePrograms_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => ServicePrograms.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<ServicePrograms_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => ServicePrograms.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<ServicePrograms_Response>(api).pipe(
            map(res => ServicePrograms.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}