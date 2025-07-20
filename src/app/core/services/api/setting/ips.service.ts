import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IpsService {
    private http = inject(HttpClient);
    private api = {
        save: 'ips/save'
    }

    post(data: any) {
        console.log("data", data);
        return of(null)
    }
}
