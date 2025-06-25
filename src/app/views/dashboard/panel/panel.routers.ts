import { Route } from '@angular/router';

export const routers: Route[] = [
    {
        path: 'analytics',
        loadComponent: () => import('./analytics/analytics.component').then(c => c.AnalyticsComponent)
    },
    {
        path: 'general',
        loadComponent: () => import('./general/general.component').then(c => c.GeneralComponent)
    },
    {
        path: 'statistics',
        loadComponent: () => import('./statistics/statistics.component').then(c => c.StatisticsComponent)
    }
];