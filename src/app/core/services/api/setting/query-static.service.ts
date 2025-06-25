import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { ActivityVehicleAPI, ActivityVehicleAPP } from '@interfaces/index';
import { ActivityVehicle } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QueryStaticService {
    private http = inject(HttpClient);
    private api = {
        list: 'actividad/lista'
    }

    vehicleState(): Observable<ActivityVehicleAPP[]> {
        const api = queries.api(this.api.list);
        return this.http.get<ActivityVehicleAPI[]>(api).pipe(
            map(data => data.map(x => ActivityVehicle.setProperty(x)))
        );
    }
}
