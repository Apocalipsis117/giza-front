import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { DiagnosisAPP_PAGE, DiagnosisDTO_APP } from '@interfaces/app';
import { DiagnosisAPI_PAGE } from '@interfaces/index';
import { Diagnosis, DiagnosisDTO } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DiagnosisService {
    private http = inject(HttpClient);
    private api = {
        save: 'diagnostico/save',
        list: 'diagnostico/lista',
        page: 'diagnostico/page',
    }

    post(data: DiagnosisDTO_APP) {
        const api = queries.api(this.api.save);
        const dataPost = DiagnosisDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAllPage(paramValue: any = null): Observable<DiagnosisAPP_PAGE> {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<DiagnosisAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => Diagnosis.setProperty(item))
            }))
        )
    }
}
