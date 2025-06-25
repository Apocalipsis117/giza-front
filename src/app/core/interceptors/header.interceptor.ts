import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const interceptorContenttype: HttpInterceptorFn = (req, next) => {
    const clone = req.clone({
        setHeaders: {
            "Content-Type": "application/json"
        }
    });
    return next(clone).pipe(catchError(handleErrorResponse));
}

function handleErrorResponse(error: HttpErrorResponse) {
    return throwError(() => 'Error');
}