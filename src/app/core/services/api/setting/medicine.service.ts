import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { MedicineAPI, MedicineAPI_PAGE, OptionsForm, TypeReturn } from '@interfaces/index';
import { MedicineAPP, MedicineAPP_PAGE, MedicineDTO_APP } from '@interfaces/app';
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

    post(data: MedicineDTO_APP) {
        const api = queries.api(this.api.save);
        const dataPost = MedicineDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<MedicineAPP[]>;
    getAll(typeReturn: 'options'): Observable<OptionsForm[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<MedicineAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => Medicine.setProperty(x));
            })
        );
    }

    getAllPage(paramValue: any = null): Observable<MedicineAPP_PAGE> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<MedicineAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => Medicine.setProperty(item))
            }))
        )
    }
}
