import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { InstitutionDTO } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {
    private http = inject(HttpClient);
    private api = {
        save: 'instituciones/save',
        list: 'instituciones/lista',
    }

    post(data: any) {
        const api = queries.api(this.api.save);
        const dataPost = InstitutionDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<any[]> {
        const api = queries.api(this.api.list);
        return this.http.get<any[]>(api).pipe(
            map(data => data)
        );
    }
}
