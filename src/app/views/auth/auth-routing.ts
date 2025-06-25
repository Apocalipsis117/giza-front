import { Route } from '@angular/router';

export const routerAuth: Route[] = [
{
    path: '',
    children: [
        {
            path: 'signin',
            loadComponent: () => import('./sign-in/sign-in.component').then(r => r.SignInComponent)
        }
    ]
}
];