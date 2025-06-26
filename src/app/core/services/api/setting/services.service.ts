import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { FormControlOption, ServicesAPI, ServicesAPP, TypeReturn } from '@interfaces/index';
import { OptionsControl, Services } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private http = inject(HttpClient);
    private api = {
        list: 'tipo-servicios/lista'
    }

    getAll(): Observable<ServicesAPP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<ServicesAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => Services.setProperty(x));
            })
        )
    }
}
