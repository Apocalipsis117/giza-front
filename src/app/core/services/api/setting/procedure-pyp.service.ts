import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { ProcedurePyp_APP, ProcedurePyp_APPDTO, ProcedurePyp_ListResponse, ProcedurePyp_PageResponse, ProcedurePyp_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { ProcedurePyp, ProcedurePypDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProcedurePypService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/procedimiento-pyp',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: ProcedurePyp_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = ProcedurePypDTO.setProperty(data);
        return this.http.post<ProcedurePyp_Response>(api, values).pipe(
            map(res => ProcedurePyp.setProperty(res.data))
        );
    }

    update(id: number, data: ProcedurePyp_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = ProcedurePypDTO.setProperty(data);
        return this.http.put<ProcedurePyp_Response>(api, values).pipe(
            map(res => ProcedurePyp.setProperty(res.data))
        );
    }

    list(): Observable<ProcedurePyp_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<ProcedurePyp_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => ProcedurePyp.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<ProcedurePyp_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => ProcedurePyp.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<ProcedurePyp_Response>(api).pipe(
            map(res => ProcedurePyp.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}