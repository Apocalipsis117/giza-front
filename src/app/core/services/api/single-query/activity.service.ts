import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiHelper } from '@helpers/index';
import { PathNameAPI } from '@interfaces/extend.i';
import { Activity_APP, Activity_ListResponse, Activity_Response, FormControlOption, TypeReturn } from '@interfaces/index';
import { Activity, OptionsControl } from '@models/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivityService {
    private http = inject(HttpClient);
    private api: PathNameAPI = {
        base: 'actividad',
        list: 'lista',
    };

    list(): Observable<Activity_APP[]>;
    list(typeReturn: 'options'): Observable<FormControlOption[]>;
    list(typeReturn: TypeReturn = null) {
        const api = apiHelper.api(this.api.base, { path: this.api.list });
        return this.http.get<Activity_ListResponse>(api).pipe(
            map(res => {
                if (typeReturn === 'options') return res.data.map(x => OptionsControl.setProperty(x.id, x.nombre));
                return res.data.map(x => Activity.setProperty(x));
            }),
            catchError(() => of([]))
        );
    }
    getBy(id: number) {
        const api = apiHelper.api(this.api.base, { path: id });
        return this.http.get<Activity_Response>(api).pipe(
            map(res => Activity.setProperty(res.data))
        );
    }
}
