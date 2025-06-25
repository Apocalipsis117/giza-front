```ts
import { ModelTest, OptionsControl } from '@models/index';
import { anyAPI, anyAPP, anyAPI_PAGE, anyAPP_PAGE } from '@interfaces/index';

export class CostCenterService {
    private http = inject(HttpClient);
    private api = {
        save: '',
        list: ''
    }

    post(data: any) {
        const api = queries.api(this.api.save);
        const dataPost = ModelTest.setProperty(data);
        return this.http.post(api, dataPost);
    }

    getAll(): Observable<anyAPP[]>;
    getAll(typeReturn: 'options'): Observable<OptionsForm[]>;
    /* query */
    getAll(typeReturn: TypeReturn = null) {
        const api = queries.api(this.api.list);
        return this.http.get<anyAPI[]>(api).pipe(
            map(data => {
                if (typeReturn === 'options') return data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return data.map(x => ModelTest.setProperty(x));
            })
        );
    }

    getAllPage(paramValue: any | null = null) {
        const api = queries.api(this.api.page, paramValue);
        return this.http.get<anyAPI_PAGE>(api).pipe(
            map(data => ({
                ...data,
                content: data.content.map(item => CostCenter.setProperty(item))
            }))
        )
    }
}
```