import { Route } from '@angular/router';

export const routerErrorhttp: Route[] = [{
    path: '404',
    loadComponent: () => import('./nofound/nofound.component').then(c => c.NofoundComponent)
}];
