import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queries } from '@helpers/index';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {
    private http = inject(HttpClient);

    get() {
        const api = queries.api('');
        return this.http.get(api);
    }
}
