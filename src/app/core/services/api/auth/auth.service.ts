import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { Login_API, Login_DTO } from '@interfaces/index';

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
        return this.http.post<Login_API>(api, data)
    }
}
