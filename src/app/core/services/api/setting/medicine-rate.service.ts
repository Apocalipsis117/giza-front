import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { MedicineRate_APP, MedicineRate_APPDTO, MedicineRate_ListResponse, MedicineRate_PageResponse, MedicineRate_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { MedicineRate, MedicineRateDTO, OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicineRateService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/tarifa-medicamento',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: MedicineRate_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = MedicineRateDTO.setProperty(data);
        return this.http.post<MedicineRate_Response>(api, values).pipe(
            map(res => MedicineRate.setProperty(res.data))
        );
    }

    update(id: number, data: MedicineRate_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = MedicineRateDTO.setProperty(data);
        return this.http.put<MedicineRate_Response>(api, values).pipe(
            map(res => MedicineRate.setProperty(res.data))
        );
    }

    list(): Observable<MedicineRate_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<MedicineRate_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.medicamento.nombre));
                return res.data.map(x => MedicineRate.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<MedicineRate_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => MedicineRate.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<MedicineRate_Response>(api).pipe(
            map(res => MedicineRate.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
