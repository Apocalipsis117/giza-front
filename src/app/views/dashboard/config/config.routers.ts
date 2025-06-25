import { Route } from '@angular/router';
import { CustomAppComponent } from './custom-app/custom-app.component';
import { ConfigHomeComponent } from './config-home/config-home.component';
import { ApplcationCogComponent } from './applcation-cog/applcation-cog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routers: Route[] = [{
    path: '',
    loadComponent: () => import('./config.component').then(c => c.ConfigComponent),
    children: [
        {
            path: 'home',
            component: ConfigHomeComponent
        },
        {
            path: 'personalization',
            component: CustomAppComponent
        },
        {
            path: 'aplicacion',
            component: ApplcationCogComponent
        },
        {
            path: 'user-profile',
            component: UserProfileComponent
        },
        {
            path: '',
            redirectTo: '/dashboard/config/home',
            pathMatch: 'full'
        }
    ]
}
];
