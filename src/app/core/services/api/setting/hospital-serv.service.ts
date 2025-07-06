import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { HospitalService_APP, HospitalService_APPDTO, HospitalService_ListResponse, HospitalService_PageResponse, HospitalService_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { HospitalService, HospitalServiceDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HospitalServService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/servicio-hospitalario',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: HospitalService_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = HospitalServiceDTO.setProperty(data);
        return this.http.post<HospitalService_Response>(api, values).pipe(
            map(res => HospitalService.setProperty(res.data))
        );
    }

    update(id: number, data: HospitalService_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = HospitalServiceDTO.setProperty(data);
        return this.http.put<HospitalService_Response>(api, values).pipe(
            map(res => HospitalService.setProperty(res.data))
        );
    }

    list(): Observable<HospitalService_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<HospitalService_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => HospitalService.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<HospitalService_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => HospitalService.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<HospitalService_Response>(api).pipe(
            map(res => HospitalService.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
