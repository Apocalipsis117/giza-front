import { Injectable } from '@angular/core';

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
}
