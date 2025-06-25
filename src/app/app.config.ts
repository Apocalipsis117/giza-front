import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { ROOT_REDUCER } from '@store/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { metaReducers } from './core/store/app.metareducer';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { interceptorAuthtoken, interceptorContenttype } from '@interceptors/index';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideStore(ROOT_REDUCER, { metaReducers }),
        provideStoreDevtools({
            maxAge: 20
        }),
        provideHttpClient(
            withFetch(),
            withInterceptors([interceptorContenttype, interceptorAuthtoken])
        ),
        provideAnimations()
    ]
};
