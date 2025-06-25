import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';
import { IpsDTO } from '@models/index';

@Injectable({
    providedIn: 'root'
})
export class IpsService {
    private http = inject(HttpClient);
    private api = {
        save: 'ips/save'
    }

    post(data: any) {
        const api = queries.api(this.api.save);
        const dataPost = IpsDTO.setProperty(data);
        return this.http.post(api, dataPost);
    }
}
