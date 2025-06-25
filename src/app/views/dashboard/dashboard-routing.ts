import { Route } from '@angular/router';

export const routerDashboard: Route[] = [{
    path: '',
    children: [{
        path: 'panel',
        loadChildren: () => import('./panel/panel.routers').then(r => r.routers)
    },
    {
        path: 'setting',
        loadChildren: () => import('./setting/setting.routers').then(r => r.routers)
    },
    {
        path: 'clinic-history',
        loadChildren: () => import('./clinic-history/clinic-history.routers').then(r => r.routers)
    },
    {
        path: 'pharmacy',
        loadChildren: () => import('./pharmacy/pharmacy.routers').then(r => r.routers)
    },
    {
        path: 'audit',
        loadChildren: () => import('./audit/audit.routers').then(r => r.routers)
    },
    {
        path: 'principal',
        loadChildren: () => import('./principal/principal.routers').then(r => r.routers)
    },
    {
        path: 'tariff',
        loadChildren: () => import('./tariff/tariff.routers').then(r => r.routers)
    },
    {
        path: 'config',
        loadChildren: () => import('./config/config.routers').then(r => r.routers)
    }]
}];
