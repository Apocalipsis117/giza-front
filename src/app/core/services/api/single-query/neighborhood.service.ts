import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { Neighborhood_APP, Neighborhood_APPDTO, Neighborhood_ListResponse, Neighborhood_PageResponse, Neighborhood_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { Neighborhood, NeighborhoodDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NeighborhoodService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'barrio-vereda',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: Neighborhood_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = NeighborhoodDTO.setProperty(data);
        return this.http.post<Neighborhood_Response>(api, values).pipe(
            map(res => Neighborhood.setProperty(res.data))
        );
    }

    update(id: number, data: Neighborhood_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = NeighborhoodDTO.setProperty(data);
        return this.http.put<Neighborhood_Response>(api, values).pipe(
            map(res => Neighborhood.setProperty(res.data))
        );
    }

    list(): Observable<Neighborhood_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<Neighborhood_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => Neighborhood.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<Neighborhood_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => Neighborhood.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<Neighborhood_Response>(api).pipe(
            map(res => Neighborhood.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}