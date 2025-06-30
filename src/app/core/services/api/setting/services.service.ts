import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { FormControlOption, Service_APP, Service_ListResponse, TypeReturn } from '@interfaces/index';
import { OptionsControl, Service } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private http = inject(HttpClient);
    private api = {
        list: 'tipo-servicios/lista'
    }

    getAll(): Observable<Service_APP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<Service_ListResponse>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.data.map(x => Service.setProperty(x));
            })
        )
    }
}
