import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI, ResponseAPI } from '@interfaces/extend.i';
import { Contract_APPDTO, Contract_PageResponse, Contract_Response } from '@interfaces/index';
import { Contract, ContractDTO } from '@models/index';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'config/entidades-administradoras',
        save: 'save',
        list: 'lista',
        page: 'page',
    }

    post(data: Contract_APPDTO) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.save
        });
        const values = ContractDTO.setProperty(data);
        return this.http.post<Contract_Response>(api, values).pipe(
            map(data => Contract.setProperty(data.data))
        )
    }

    update(id: number, data: Contract_APPDTO) {
        const api = apiHelper.api(this.api.base, {
            path: id
        });
        const values = ContractDTO.setProperty(data);
        return this.http.put<ResponseAPI<string>>(api, values).pipe(
            map(data => data)
        )
    }

    page(paramValue: any = null) {
        const api = apiHelper.api(this.api.base, {
            path: this.api.page,
            params: paramValue
        });
        return this.http.get<Contract_PageResponse>(api).pipe(
            map(data => ({
                ...data.data,
                content: data.data.content.map(item => Contract.setProperty(item))
            }))
        )
    }

    getBy(uuid: string) {
        const api = apiHelper.api(this.api.base, {
            path: uuid
        });
        return this.http.get<Contract_Response>(api).pipe(
            map(data =>  Contract.setProperty(data.data))
        )
    }
}
