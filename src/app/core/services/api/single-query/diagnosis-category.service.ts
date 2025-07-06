import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI, ResponsePAGE_API } from '@interfaces/extend.i';
import { SDiag_APP, SDiag_API, FormControlOption, TypeReturn } from '@interfaces/index';
import { SDiag, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiagnosisCategoryService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'categoria-diag',
        list: 'lista',
        page: 'page',
    };

    list(): Observable<SDiag_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<ResponseAPI<SDiag_API[]>>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => SDiag.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<ResponsePAGE_API<SDiag_API>>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => SDiag.setProperty(item))
            }))
        );
    }
}
