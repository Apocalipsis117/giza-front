import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { handleErrorResponse } from './httpHelper';

export const interceptorContenttype: HttpInterceptorFn = (req, next) => {
    const clone = req.clone({
        setHeaders: {
            "Content-Type": "application/json"
        }
    });
    return next(clone).pipe(catchError(handleErrorResponse));
}