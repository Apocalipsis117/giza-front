import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { TariffMedicine_APP, TariffMedicine_APPDTO, TariffMedicine_ListResponse, TariffMedicine_PageResponse, TariffMedicine_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { TariffMedicine, TariffMedicineDTO, OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TariffMedicineService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/tarifa-medicamento',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: TariffMedicine_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = TariffMedicineDTO.setProperty(data);
        return this.http.post<TariffMedicine_Response>(api, values).pipe(
            map(res => TariffMedicine.setProperty(res.data))
        );
    }

    update(id: number, data: TariffMedicine_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = TariffMedicineDTO.setProperty(data);
        return this.http.put<TariffMedicine_Response>(api, values).pipe(
            map(res => TariffMedicine.setProperty(res.data))
        );
    }

    list(): Observable<TariffMedicine_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<TariffMedicine_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.medicamento.nombre));
                return res.data.map(x => TariffMedicine.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<TariffMedicine_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => TariffMedicine.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<TariffMedicine_Response>(api).pipe(
            map(res => TariffMedicine.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
