import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { LocalStorageService } from '../services/app/local-storage.service';
import { handleErrorResponse } from './httpHelper';

export const interceptorAuthtoken: HttpInterceptorFn = (req, next) => {
    const localStorage$ = inject(LocalStorageService);
    let clone = req;
    const store = localStorage$.userLogin;
    if(store && store.token) {
        clone = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + store.token
            }
        });
    }

    return next(clone).pipe(catchError(handleErrorResponse));
};
