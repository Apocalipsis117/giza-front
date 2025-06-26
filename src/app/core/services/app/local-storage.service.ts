import { Injectable } from '@angular/core';
import { Login_API } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    private getStore(name: string): null | any {
        let data = null;
        const getItem: any = localStorage.getItem(name);
        if(getItem) {
            data = JSON.parse(getItem);
        }
        return data;
    }

    get userLogin() {
        return this.getStore('gisa_user') as Login_API;
    }
}
