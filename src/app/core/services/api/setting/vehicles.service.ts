import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { VehicleDTO, Vehicle } from '@models/index';
import { Observable, map } from 'rxjs';
import { VehicleAPI, VehicleAPP } from '@interfaces/index';
import { queries } from '@helpers/index';

@Injectable({
    providedIn: 'root'
})
export class VehiclesService {
    private http = inject(HttpClient);
    private api = {
        list: 'vehiculo/lista',
        save: 'vehiculo/save'
    }

    post(data: any) {
        const api = queries.api(this.api.save);
        const dto = VehicleDTO.setProperty(data);
        return this.http.post(api, dto);
    }

    getAll(): Observable<VehicleAPP[]> {
        const api = queries.api(this.api.list);
        return this.http.get<VehicleAPI[]>(api).pipe(
            map(data => data.map(data => Vehicle.setProperty(data)))
        );
    }
}
