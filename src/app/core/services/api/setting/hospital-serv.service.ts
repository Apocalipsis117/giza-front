import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { HospitalServiceAPI, HospitalServiceAPP, HospitalServiceDTO_APP } from '@interfaces/index';
import { HoospitalServiceDTO, HospitalService } from '@models/index';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HospitalServService {
    private http = inject(HttpClient);
    private api = {
        save: 's-hospitalario/save',
        list: 's-hospitalario/lista'
    }

    post(data: HospitalServiceDTO_APP) {
        const api = queries.api(this.api.save);
        const dataPost = HoospitalServiceDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<HospitalServiceAPP[]> {
        const api = queries.api(this.api.list);
        return this.http.get<HospitalServiceAPI[]>(api).pipe(
            map(data => data.map(x => HospitalService.setProperty(x)))
        );
    }
}
