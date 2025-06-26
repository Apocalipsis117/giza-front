import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleErrorResponse(error: HttpErrorResponse) {
    return throwError(() => 'Error');
}