import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { Medicine_APP, Medicine_APPDTO, Medicine_ListResponse, Medicine_PageResponse, Medicine_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { Medicine, MedicineDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicineService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/medicamento',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: Medicine_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = MedicineDTO.setProperty(data);
        return this.http.post<Medicine_Response>(api, values).pipe(
            map(res => Medicine.setProperty(res.data))
        );
    }

    update(id: number, data: Medicine_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = MedicineDTO.setProperty(data);
        return this.http.put<Medicine_Response>(api, values).pipe(
            map(res => Medicine.setProperty(res.data))
        );
    }

    list(): Observable<Medicine_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<Medicine_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => Medicine.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<Medicine_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => Medicine.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<Medicine_Response>(api).pipe(
            map(res => Medicine.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
