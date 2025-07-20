import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { LegalInformation_APP, LegalInformation_APPDTO, LegalInformation_ListResponse, LegalInformation_PageResponse, LegalInformation_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { LegalInformation, LegalInformationDTO, OptionsControl } from '@models/index';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LegalInformationService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/datos-legales-ips',
        save: 'save',
        list: 'lista',
        page: 'page',
    };

    post(data: LegalInformation_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: this.api.save });
        const values = LegalInformationDTO.setProperty(data);
        return this.http.post<LegalInformation_Response>(api, values).pipe(
            map(res => LegalInformation.setProperty(res.data))
        );
    }

    update(uuid: string, data: LegalInformation_APPDTO) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        const values = LegalInformationDTO.setProperty(data);
        return this.http.put<LegalInformation_Response>(api, values).pipe(
            map(res => LegalInformation.setProperty(res.data))
        );
    }

    list(): Observable<LegalInformation_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<LegalInformation_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.uuid, x.nombre));
                return res.data.map(x => LegalInformation.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.page, params: paramValue });
        return this.http.get<LegalInformation_PageResponse>(api).pipe(
            map(res => ({
                ...res.data,
                content: res.data.content.map(item => LegalInformation.setProperty(item))
            }))
        );
    }

    getBy(uuid: string) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        return this.http.get<LegalInformation_Response>(api).pipe(
            map(res => LegalInformation.setProperty(res.data))
        );
    }

    delete(uuid: string) {
        const api = apiHelper.api(this.api.base, { path: uuid });
        return this.http.delete<ResponseAPI<string>>(api);
    }
}