import { Route } from '@angular/router';

export const routers: Route[] = [{
    path: '',
    loadComponent: () => import('./shortcut-principal/shortcut-principal.component').then(c => c.ShortcutPrincipalComponent)
},
{
    path: 'patients',
    loadComponent: () => import('./patients/patients.component').then(c => c.PatientsComponent)
},
{
    path: 'medical-agenda',
    loadComponent: () => import('./medical-agenda/medical-agenda.component').then(c => c.MedicalAgendaComponent)
},
{
    path: 'billing',
    loadComponent: () => import('./billing/billing.component').then(c => c.BillingComponent)
},
{
    path: 'group-billing',
    loadComponent: () => import('./group-billing/group-billing.component').then(c => c.GroupBillingComponent)
},
{
    path: 'auth-annex',
    loadComponent: () => import('./auth-annex/auth-annex.component').then(c => c.AuthAnnexComponent)
},
{
    path: 'incivility-annex',
    loadComponent: () => import('./incivility-annex/incivility-annex.component').then(c => c.IncivilityAnnexComponent)
},
{
    path: 'billable-admissions',
    loadComponent: () => import('./billable-admissions/billable-admissions.component').then(c => c.BillableAdmissionsComponent)
},
{
    path: 'cash-receipts',
    loadComponent: () => import('./cash-receipts/cash-receipts.component').then(c => c.CashReceiptsComponent)
},
{
    path: 'auth-consults',
    loadComponent: () => import('./auth-consults/auth-consults.component').then(c => c.AuthConsultsComponent)
},
{
    path: 'survey',
    loadComponent: () => import('./survey/survey.component').then(c => c.SurveyComponent)
}
];
