import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { DiagnosisGroup_APP, DiagnosisGroup_APPDTO, DiagnosisGroup_ListResponse, DiagnosisGroup_PageResponse, DiagnosisGroup_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { DiagnosisGroup, DiagnosisGroupDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DiagnosisGroupService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/grupo-diagnostico',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: DiagnosisGroup_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = DiagnosisGroupDTO.setProperty(data);
        return this.http.post<DiagnosisGroup_Response>(api, values).pipe(
            map(res => DiagnosisGroup.setProperty(res.data))
        );
    }

    update(id: number, data: DiagnosisGroup_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = DiagnosisGroupDTO.setProperty(data);
        return this.http.put<DiagnosisGroup_Response>(api, values).pipe(
            map(res => DiagnosisGroup.setProperty(res.data))
        );
    }

    list(): Observable<DiagnosisGroup_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<DiagnosisGroup_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => DiagnosisGroup.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<DiagnosisGroup_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => DiagnosisGroup.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<DiagnosisGroup_Response>(api).pipe(
            map(res => DiagnosisGroup.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}