import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { Medicine_API, Medicine_PageResponse, FormControlOption, TypeReturn, Medicine_PageAPP, Medicine_APP, Medicine_APPDTO } from '@interfaces/index';
import { Medicine, MedicineDTO, OptionsControl } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MedicineService {
    private http = inject(HttpClient);
    private api = {
        save: 'medicamento/save',
        list: 'medicamento/lista',
        page: 'medicamento/page'
    }

    post(data: Medicine_APPDTO) {
        const api = queries.api(this.api.save);
        const dataPost = MedicineDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<Medicine_APP[]>;
    getAll(typeReturn: 'options'): Observable<FormControlOption[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<Medicine_API[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => Medicine.setProperty(x));
            })
        );
    }

    getAllPage(paramValue: any = null): Observable<Medicine_PageAPP> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<Medicine_PageResponse>(api).pipe(
            map(data => ({
                ...data.data,
                content: data.data.content.map(item => Medicine.setProperty(item))
            }))
        )
    }
}
