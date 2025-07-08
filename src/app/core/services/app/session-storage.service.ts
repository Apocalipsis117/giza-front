import { Injectable } from '@angular/core';
import { State_user } from '@interfaces/app';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

    private getStore(name: string): null | any {
        let data = null;
        const getItem: any = sessionStorage.getItem(name);
        if(getItem) {
            data = JSON.parse(getItem);
        }
        return data;
    }

    get userLogin() {
        return this.getStore('gisa_user') as State_user;
    }
}
