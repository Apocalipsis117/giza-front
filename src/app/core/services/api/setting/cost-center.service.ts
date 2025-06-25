import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { CostCenterAPI, CostCenterAPP, CostCenterDTO_APP, CostCenterAPP_PAGE, CostCenterAPI_PAGE, OptionsForm, TypeReturn } from '@interfaces/index';
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

    post(data: CostCenterDTO_APP) {
        const api = queries.api(this.api.save);
        const dataPost = CostCenterDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<CostCenterAPP[]>;
    getAll(typeReturn: 'options'): Observable<OptionsForm[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<CostCenterAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => CostCenter.setProperty(x));
            })
        );
    }

    getAllPage(paramValue: any = null): Observable<CostCenterAPP_PAGE> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<CostCenterAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => CostCenter.setProperty(item))
            }))
        )
    }
}


