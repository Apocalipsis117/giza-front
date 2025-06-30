import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { CostCenter_API, CostCenter_APP, CostCenter_APPDTO, CostCenter_PageAPP, CostCenter_PageResponse, FormControlOption, TypeReturn } from '@interfaces/index';
import { CostCenter, CostCenterDTO, OptionsControl } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CostCenterService {
    private http = inject(HttpClient);
    private api = {
        save: 'c-costo/save',
        list: 'c-costo/lista',
        page: 'c-costo/page'
    }

    post(data: CostCenter_APPDTO) {
        const api = queries.api(this.api.save);
        const dataPost = CostCenterDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<CostCenter_APP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<CostCenter_API[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => CostCenter.setProperty(x));
            })
        );
    }

    getAllPage(paramValue: any = null): Observable<CostCenter_PageAPP> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<CostCenter_PageResponse>(api).pipe(
            map(data => ({
                ...data.data,
                content: data.data.content.map(item => CostCenter.setProperty(item))
            }))
        )
    }
}


