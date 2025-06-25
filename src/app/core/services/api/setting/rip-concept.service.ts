import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { OptionsForm, RIPConceptAPI, RIPConceptAPP, RIPConceptDTO_APP, TypeReturn } from '@interfaces/index';
import { OptionsControl, RipConceptDTO, RipConcept } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RipConceptService {
    private http = inject(HttpClient);
    private api = {
        list: 'concepto-rips/lista',
        save: 'concepto-rips/save',
    }

    post(data: RIPConceptDTO_APP) {
        const api = queries.api(this.api.save);
        const dataPost = RipConceptDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<RIPConceptAPP[]>;
    getAll(typeReturn: 'options'): Observable<OptionsForm[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<RIPConceptAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => RipConcept.setProperty(x));
            })
        );
    }
}
