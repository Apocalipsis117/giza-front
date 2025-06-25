import { Injectable } from '@angular/core';
import { Todo, TodoStorage } from '@interfaces/index';
import { environment } from 'src/environments/environment';
import { appStorage } from '@helpers/index';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {
    store: appStorage;
    private dataStorage: TodoStorage = {
        title: '',
        todo: []
    };

    constructor(){
        this.store = new appStorage(environment.nameStorage.todo, {
            encryptKey: environment.cryptoKey.todo
        })
    }

    addTodo(item: Todo) {
        this.getStorage.subscribe((data) => {
            const todo = {
                ...data,
                todo: [...data.todo, item]
            };
            this.store.setStore(todo);
        })
    }

    get getStorage(): Observable<TodoStorage> {
        return this.store.getStore();
    }

    get storage(): Observable<TodoStorage> {
        return this.store.storage;
    }

    create() {
        this.store.create(this.dataStorage)
    }

    reset() {
        this.store.reset(this.dataStorage)
    }
}
