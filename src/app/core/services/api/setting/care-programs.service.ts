import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { CarePrograms_APP, CarePrograms_APPDTO, CarePrograms_ListResponse, CarePrograms_PageResponse, CarePrograms_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { CarePrograms, CareProgramsDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CareProgramsService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/programa-atencion',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: CarePrograms_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = CareProgramsDTO.setProperty(data);
        return this.http.post<CarePrograms_Response>(api, values).pipe(
            map(res => CarePrograms.setProperty(res.data))
        );
    }

    update(id: number, data: CarePrograms_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = CareProgramsDTO.setProperty(data);
        return this.http.put<CarePrograms_Response>(api, values).pipe(
            map(res => CarePrograms.setProperty(res.data))
        );
    }

    list(): Observable<CarePrograms_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<CarePrograms_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => CarePrograms.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<CarePrograms_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => CarePrograms.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<CarePrograms_Response>(api).pipe(
            map(res => CarePrograms.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}