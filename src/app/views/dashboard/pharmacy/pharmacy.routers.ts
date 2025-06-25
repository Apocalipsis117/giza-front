import { Route } from '@angular/router';

export const routers: Route[] = [
    {
        path: '',
        loadComponent: () => import('./shortcut-pharmacy/shortcut-pharmacy.component').then(c => c.ShortcutPharmacyComponent)
    },
    {
        path: 'packoff',
        loadComponent: () => import('./packoff/packoff.component').then(c => c.PackoffComponent)
    }
];