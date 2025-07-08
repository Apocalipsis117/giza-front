import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { ClassificationMaterials_APP, ClassificationMaterials_ListResponse, FormControlOption, TypeReturn } from '@interfaces/index';
import { ClassificationMaterials, OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClassificationMaterialsService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'clasificacion-mat',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    list(): Observable<ClassificationMaterials_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<ClassificationMaterials_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => ClassificationMaterials.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }
}