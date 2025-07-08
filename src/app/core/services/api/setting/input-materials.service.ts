import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { InputMaterials_APP, InputMaterials_APPDTO, InputMaterials_ListResponse, InputMaterials_PageResponse, InputMaterials_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { InputMaterials, InputMaterialsDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InputMaterialsService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/materiales-ins',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: InputMaterials_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = InputMaterialsDTO.setProperty(data);
        return this.http.post<InputMaterials_Response>(api, values).pipe(
            map(res => InputMaterials.setProperty(res.data))
        );
    }

    update(id: number, data: InputMaterials_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: id });
        const values = InputMaterialsDTO.setProperty(data);
        return this.http.put<InputMaterials_Response>(api, values).pipe(
            map(res => InputMaterials.setProperty(res.data))
        );
    }

    list(): Observable<InputMaterials_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<InputMaterials_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => InputMaterials.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<InputMaterials_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => InputMaterials.setProperty(item))
            }))
        );
    }

    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<InputMaterials_Response>(api).pipe(
            map(res => InputMaterials.setProperty(res.data))
        );
    }

    delete(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}
