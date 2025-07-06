import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { Diagnosis_APP, Diagnosis_APPDTO, Diagnosis_ListResponse, Diagnosis_PageResponse, Diagnosis_Response, FormControlOption, FormControlOption2, TypeReturn } from '@interfaces/index';
import { Diagnosis, DiagnosisDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DiagnosisService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/diagnostico',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: Diagnosis_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = DiagnosisDTO.setProperty(data);
        return this.http.post<Diagnosis_Response>(api, values).pipe(
            map(res => Diagnosis.setProperty(res.data))
        );
    }

    update(id: number, data: Diagnosis_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = DiagnosisDTO.setProperty(data);
        return this.http.put<Diagnosis_Response>(api, values).pipe(
            map(res => Diagnosis.setProperty(res.data))
        );
    }

    list(): Observable<Diagnosis_APP[]>;
    list(typeReturn: 'options2'): Observable<FormControlOption2[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<Diagnosis_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options' || typeReturn === 'options2') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => Diagnosis.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<Diagnosis_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => Diagnosis.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<Diagnosis_Response>(api).pipe(
            map(res => Diagnosis.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
