import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { SessionStorageService } from '../services/app/session-storage.service';
import { handleErrorResponse } from './httpHelper';

export const interceptorAuthtoken: HttpInterceptorFn = (req, next) => {
    const localStorage$ = inject(SessionStorageService);
    let clone = req;
    const store = localStorage$.userLogin;
    if (store && store.login) {
        clone = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + store.login.token
            }
        });
    }

    return next(clone).pipe(catchError(handleErrorResponse));
};
