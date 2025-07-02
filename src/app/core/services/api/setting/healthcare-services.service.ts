import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { HealthcareServices_APP, HealthcareServices_APPDTO, HealthcareServices_ListResponse, HealthcareServices_PageResponse, HealthcareServices_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { HealthcareServices, HealthcareServicesDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HealthcareServicesService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/s-asistenciales',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: HealthcareServices_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = HealthcareServicesDTO.setProperty(data);
        return this.http.post<HealthcareServices_Response>(api, values).pipe(
            map(res => HealthcareServices.setProperty(res.data))
        );
    }

    update(id: number, data: HealthcareServices_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = HealthcareServicesDTO.setProperty(data);
        return this.http.put<HealthcareServices_Response>(api, values).pipe(
            map(res => HealthcareServices.setProperty(res.data))
        );
    }

    list(): Observable<HealthcareServices_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<HealthcareServices_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => HealthcareServices.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<HealthcareServices_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => HealthcareServices.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<HealthcareServices_Response>(api).pipe(
            map(res => HealthcareServices.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
