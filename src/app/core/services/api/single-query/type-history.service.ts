import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { FormControlOption, TypeHistoryAPI, TypeHistoryAPP, TypeReturn } from '@interfaces/index';
import { OptionsControl, TypeHisotry } from '@models/index';
import { Observable, map } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TypeHistoryService {
    private http = inject(HttpClient);
    private api = {
        list: 'tipo-historia/lista'
    }

    getAll(): Observable<TypeHistoryAPP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<TypeHistoryAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => TypeHisotry.setProperty(x));
            })
        )
    }

}
