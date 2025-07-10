import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TodoFake_API } from './todo-fake.i';
import { PageAPI } from '@interfaces/extend.i';

@Injectable({
    providedIn: 'root'
})
export class TodoFakeService {
    private http = inject(HttpClient);

    page(parasm: any) {
        console.log("parasm", parasm);
        const api = 'https://api-rest.dev/localdb/index.php?api=todo/paginate';
        return this.http.post<PageAPI<TodoFake_API>>(api, parasm);
    }
}
