import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { Vehicle_APP, Vehicle_APPDTO, Vehicle_ListResponse, Vehicle_PageResponse, Vehicle_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { Vehicle, VehicleDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/vehiculo',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: Vehicle_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = VehicleDTO.setProperty(data);
        return this.http.post<Vehicle_Response>(api, values).pipe(
            map(res => Vehicle.setProperty(res.data))
        );
    }

    update(uuid: string, data: Vehicle_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        const values = VehicleDTO.setProperty(data);
        return this.http.put<Vehicle_Response>(api, values).pipe(
            map(res => Vehicle.setProperty(res.data))
        );
    }

    list(): Observable<Vehicle_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<Vehicle_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.uuid, x.marca));
                return res.data.map(x => Vehicle.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<Vehicle_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => Vehicle.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<Vehicle_Response>(api).pipe(
            map(res => Vehicle.setProperty(res.data))
        );
    }

    delete(uuid: string) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
