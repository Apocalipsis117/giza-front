import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { OptionsForm, TypeDniIPSAPI, TypeDniIPSAPP, TypeReturn } from '@interfaces/index';
import { OptionsControl, TypeDniIps } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeDniIpsService {
    private http = inject(HttpClient);

    getAll(): Observable<TypeDniIPSAPP[]>;
    getAll(typeReturn: 'options'): Observable<OptionsForm[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api('tipo-dni-ips/lista');
        return this.http.get<TypeDniIPSAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => TypeDniIps.setProperty(x));
            })
        );
    }
}
