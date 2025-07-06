import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { RipConcept_APP, RipConcept_APPDTO, RipConcept_ListResponse, RipConcept_PageResponse, RipConcept_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { RipConcept, RipConceptDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RipConceptService {
    private http = inject(HttpClient);
        private api: PathNameAPI = {
            base: 'config/concepto-rips',
            save: 'save',
            list: 'lista',
            page: 'page',
        };

        post(data: RipConcept_APPDTO) {
            const api = apiHelper.api(this.api.base, { path: this.api.save });
            const values = RipConceptDTO.setProperty(data);
            return this.http.post<RipConcept_Response>(api, values).pipe(
                map(res => RipConcept.setProperty(res.data))
            );
        }

        update(id: number, data: RipConcept_APPDTO) {
            const api = apiHelper.api(this.api.base, { path: id });
            const values = RipConceptDTO.setProperty(data);
            return this.http.put<RipConcept_Response>(api, values).pipe(
                map(res => RipConcept.setProperty(res.data))
            );
        }

        list(): Observable<RipConcept_APP[]>;
        list(typeReturn: 'options'): Observable<FormControlOption[]>;
        list(typeReturn: TypeReturn = null) {
            const api = apiHelper.api(this.api.base, { path: this.api.list });
            return this.http.get<RipConcept_ListResponse>(api).pipe(
                map(res => {
                    if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                    return res.data.map(x => RipConcept.setProperty(x));
                }),
                catchError(() => of([]))
            );
        }

        page(paramValue: any = null) {
            const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
            return this.http.get<RipConcept_PageResponse>(api).pipe(
                map(res => ({
                    ...res.data,
                    content: res.data.content.map(item => RipConcept.setProperty(item))
                }))
            );
        }

        getBy(id: number) {
            const api = apiHelper.api(this.api.base, { path: id });
            return this.http.get<RipConcept_Response>(api).pipe(
                map(res => RipConcept.setProperty(res.data))
            );
        }

        delete(id: number) {
            const api = apiHelper.api(this.api.base, { path: id });
            return this.http.delete<ResponseAPI<string>>(api);
        }
}
