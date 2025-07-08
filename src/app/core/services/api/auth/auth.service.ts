import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { Login_API, Login_DTO } from '@interfaces/index';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'auth',
        login: 'log-in',
        save: 'sign-up'
    }

    login(data: Login_DTO) {
        const api = apiHelper.login(this.api.login);
        return this.http.post<ResponseAPI<Login_API>>(api, data).pipe(
            map(data => data.data)
        )
    }
}
