import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { CostCenter_APP, CostCenter_APPDTO, CostCenter_ListResponse, CostCenter_PageResponse, CostCenter_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { CostCenter, CostCenterDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CostCenterService {
    private http = inject(HttpClient);
        private api: PathNameAPI = {
            base: 'config/centro-costo',
            save: 'save',
            list: 'lista',
            page: 'page',
        };

        post(data: CostCenter_APPDTO) {
            const api = apiHelper.api(this.api.base, { path: this.api.save });
            const values = CostCenterDTO.setProperty(data);
            return this.http.post<CostCenter_Response>(api, values).pipe(
                map(res => CostCenter.setProperty(res.data))
            );
        }

        update(id: number, data: CostCenter_APPDTO) {
            const api = apiHelper.api(this.api.base, { path: id });
            const values = CostCenterDTO.setProperty(data);
            return this.http.put<CostCenter_Response>(api, values).pipe(
                map(res => CostCenter.setProperty(res.data))
            );
        }

        list(): Observable<CostCenter_APP[]>;
        list(typeReturn: 'options'): Observable<FormControlOption[]>;
        list(typeReturn: TypeReturn = null) {
            const api = apiHelper.api(this.api.base, { path: this.api.list });
            return this.http.get<CostCenter_ListResponse>(api).pipe(
                map(res => {
                    if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                    return res.data.map(x => CostCenter.setProperty(x));
                }),
                catchError(() => of([]))
            );
        }

        page(paramValue: any = null) {
            const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
            return this.http.get<CostCenter_PageResponse>(api).pipe(
                map(res => ({
                    ...res.data,
                    content: res.data.content.map(item => CostCenter.setProperty(item))
                }))
            );
        }

        getBy(id: number) {
            const api = apiHelper.api(this.api.base, { path: id });
            return this.http.get<CostCenter_Response>(api).pipe(
                map(res => CostCenter.setProperty(res.data))
            );
        }

        delete(id: number) {
            const api = apiHelper.api(this.api.base, { path: id });
            return this.http.delete<ResponseAPI<string>>(api);
        }
}


