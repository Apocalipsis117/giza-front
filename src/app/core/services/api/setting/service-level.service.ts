import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { FormControlOption, NamedEntityAPI, ServiceLevelAPP, TypeReturn } from '@interfaces/index';
import { NamedEntity, OptionsControl } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServiceLevelService {
    private readonly http = inject(HttpClient);
    private readonly api = {
        list: 'n-servicio/lista'
    }

    getAll(): Observable<ServiceLevelAPP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<NamedEntityAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => NamedEntity.setProperty(x));
            })
        );
    }
}
