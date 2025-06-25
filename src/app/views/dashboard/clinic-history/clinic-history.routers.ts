import { Route } from '@angular/router';

export const routers: Route[] = [
    {
        path: '',
        loadComponent: () => import('./shortcut-clinic-history/shortcut-clinic-history.component').then(c => c.ShortcutClinicHistoryComponent)
    },
    {
        path: 'external-consultation',
        loadComponent: () => import('./external-consultation/external-consultation.component').then(c => c.ExternalConsultationComponent)
    },
    {
        path: 'physical-therapy',
        loadComponent: () => import('./physical-therapy/physical-therapy.component').then(c => c.PhysicalTherapyComponent)
    },
    {
        path: 'triage-clinic',
        loadComponent: () => import('./triage-clinic/triage-clinic.component').then(c => c.TriageClinicComponent)
    },
    {
        path: 'priority-queries',
        loadComponent: () => import('./priority-queries/priority-queries.component').then(c => c.PriorityQueriesComponent)
    },
    {
        path: 'patients-emergency',
        loadComponent: () => import('./patients-emergency/patients-emergency.component').then(c => c.PatientsEmergencyComponent)
    },
    {
        path: 'occupational-therapy',
        loadComponent: () => import('./occupational-therapy/occupational-therapy.component').then(c => c.OccupationalTherapyComponent)
    },
    {
        path: 'personal-injuries',
        loadComponent: () => import('./personal-injuries/personal-injuries.component').then(c => c.PersonalInjuriesComponent)
    },
    {
        path: 'hospitalization',
        loadComponent: () => import('./hospitalization/hospitalization.component').then(c => c.HospitalizationComponent)
    }
];