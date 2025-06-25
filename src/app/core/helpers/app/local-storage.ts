import { Observable, Subject, of, timer } from "rxjs";
import { DataStorage } from '@interfaces/index';
import { transform } from '@helpers/index';

export class appStorage {
    storage = new Subject<any>();
    options: DataStorage;
    constructor(
        private id: string,
        private optionsStorage?: DataStorage
    ) {
        this.options = {
            encryptKey: optionsStorage?.encryptKey ? optionsStorage.encryptKey : 'key-default' // recomendacion usar otra
        }
    }

    create(data: any) {
        if(this.exist){
            this.setStore(data)
        } else {
            this.shared()
        }
    }

    reset(data: any) {
        this.setStore(data);
    }

    delete(){
        if(!this.exist) localStorage.removeItem(this.id);
    }

    setStore(data: any) {
        transform.encrypData(data, this.options.encryptKey).subscribe(data => {
            const store = JSON.stringify(data);
            localStorage.setItem(this.id, store);
            this.shared();
        })
    }

    getStore(): Observable<any> {
        const getItem: any = localStorage.getItem(this.id);
        const item = JSON.parse(getItem);
        const data = transform.descryptData(item, this.options.encryptKey);
        return of(data)
    }

    private get exist(){
        return !localStorage.getItem(this.id);
    }

    private shared(){
        this.getStore().subscribe(data => {
            timer(0).subscribe(() => this.storage.next(data))
        })
    }
}