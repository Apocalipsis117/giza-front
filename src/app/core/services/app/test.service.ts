import { Injectable } from '@angular/core';
import { queries } from '@helpers/index';
import { FormControlOption } from '@interfaces/index';
import { Observable, Subject, delay, of, switchMap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private data$ = new Subject<any | null>();
    watchData = this.data$.asObservable();

    post<T>(data: T, status: number = 200): Observable<T> {
        return of(null).pipe(
            delay(1000),
            switchMap(() => {
                if (status === 200 || status === 201) {
                    return of(data);
                } else {
                    return throwError(() => ({
                        status,
                        message: 'Error occurred',
                        body: data
                    }));
                }
            })
        );
    }

    getAllPage(paramValue: any | null = null) {
        const api = queries.api('http:example/page', paramValue);
        console.log("api", api);
        return of({
            data: [
                { id: 1, name: 'Cost Center 1' },
                { id: 2, name: 'Cost Center 2' },
                { id: 3, name: 'Cost Center 3' }
            ],
            total: 3
        }).pipe(delay(1000));
    }

    getOptions(type: 'options'): Observable<FormControlOption[]> {
        return of([
            { value: 1, name: 'Option 1' },
            { value: 2, name: 'Option 2' },
            { value: 3, name: 'Option 3' }
        ]).pipe(delay(1000));
    }

    bridge<T>(): Observable<T> {
        return of().pipe(delay(1000));
    }

    emit(data: any | null) {
        this.data$.next(data);
    }
}
