import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const interceptorAuthtoken: HttpInterceptorFn = (req, next) => {
    const authToken = 'queso';
    const clone = req.clone({
        setHeaders: {
            "X-Authentication-Token": authToken
        }
    });
    return next(clone).pipe(catchError(handleErrorResponse));
}

function handleErrorResponse(error: HttpErrorResponse) {
    return throwError(() => 'Error');
}