1. copiar carpetas:

## packeages

```json
{
    "dependencies": {
        "@ngrx/store": "^18.0.2",
        "@ngrx/store-devtools": "^18.0.2",
        "angular-imask": "^7.5.0",
        "chart.js": "^4.4.1",
        "crypto-js": "^4.2.0",
        "ng2-charts": "^5.0.4",
        "ngrx-store-localstorage": "^18.0.0",
        "sweetalert2": "^11.9.0",
    },
    "devDependencies": {
        "@types/crypto-js": "^4.2.1",
        "autoprefixer": "^10.4.16",
        "postcss": "^8.4.31",
        "postcss-nesting": "^13.0.0",
        "tailwindcss": "^3.3.5",
    }
}
```

## src

- tailwind.json
- styles.scss
- assets/ui

## app

- app/components
- app/core
- app/views
- app/typed.d.ts


> NOTA
> actualizar el tipado en la app con mi nueva version
> _eliminar esto si ya esta hecho_

2. reubicacion de carpetas

- assets/img --to--> public/assets/img

no llamara aun

3. intall tailwind

- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init

```js
module.exports= {
    content: ["./src/**/*.{html,ts,json}"],
    theme: {
        extend: {
            colors: {
                default: {
                    50: '#f3faff',
                    100: '#dbf0ff',
                    200: '#b8e3ff',
                    300: '#8dd1ff',
                    400: '#46b5ff',
                    500: '#0099ff',
                    600: '#0084dc',
                    700: '#0071bc',
                    800: '#005893',
                    900: '#024e80',
                    950: '#003a60'
                }
            }
        },
    },
    plugins: [],
}
```

4. intalar packages

- `npm i angular-imask chart.js crypto-js ng2-charts sweetalert2`
- `npm i --save-dev @types/crypto-js`
- `npm i @ngrx/store`
- `npm i @ngrx/store-devtools --save`
- `npm i ngrx-store-localstorage`

5. update app.config.ts

__verifica cada caracteristica__ ya que hay algunas que no son utiles.

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { metaReducers } from './core/store/app.metareducer';

// app
import { routes } from './app.routes';
import { ROOT_REDUCER } from '@store/app';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { interceptorAuthtoken, interceptorContenttype } from '@interceptors/index';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
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

```

