import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { FormControlOption, NameStateEntity_API, NameStateEntity_APP, NameStateEntity_APPDTO, NameStateEntity_Response, TypeReturn } from '@interfaces/index';
import { OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';
import { NameStateEntity, NameStateEntityDTO } from 'src/app/core/models/single-query/name-entity.m';

@Injectable({
    providedIn: 'root'
})
export class TariffManualService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'manual-tarifario',
        list: 'lista',
    }

    post(data: NameStateEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = NameStateEntityDTO.setProperty(data);
        return this.http.post<NameStateEntity_Response>(api, values).pipe(
            map(res => NameStateEntity.setProperty(res.data))
        );
    }

    update(id: number, data: NameStateEntity_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = NameStateEntityDTO.setProperty(data);
        return this.http.put<NameStateEntity_Response>(api, values).pipe(
            map(res => NameStateEntity.setProperty(res.data))
        );
    }

    list(): Observable<NameStateEntity_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.list
        });
        return this.http.get<ResponseAPI<NameStateEntity_API[]>>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.data.map(x => NameStateEntity.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<NameStateEntity_Response>(api).pipe(
            map(res => NameStateEntity.setProperty(res.data))
        );
    }
}
