import { Routes } from '@angular/router';

export const routes: Routes = [    {
        path: 'public',
        loadComponent: () => import('./views/public/public.component').then(c => c.PublicComponent),
        loadChildren: () => import('./views/public/public-routing').then(r => r.routerPublic)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./views/dashboard/dashboard.component').then(c => c.DashboardComponent),
        loadChildren: () => import('./views/dashboard/dashboard-routing').then(r => r.routerDashboard)
    },
    {
        path: 'auth',
        loadComponent: () => import('./views/auth/auth.component').then(c => c.AuthComponent),
        loadChildren: () => import('./views/auth/auth-routing').then(r => r.routerAuth)
    },
    {
        path: 'error-http',
        loadComponent: () => import('./views/errorhttp/errorhttp.component').then(c => c.ErrorhttpComponent),
        loadChildren: () => import('./views/errorhttp/errorhttp-routing').then(r => r.routerErrorhttp)
    },
    {
        path:'',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
    },
    {
        path:'**',
        redirectTo: '/error-http/notfound',
        pathMatch: 'full'
    },
];
