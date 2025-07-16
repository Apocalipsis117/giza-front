import { Route } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/core/guards/unsave-changes.g';

export const routers: Route[] = [{
    path: '',
    loadComponent: () => import('./shortcut-setting/shortcut-setting.component').then(c => c.ShortcutSettingComponent)
},
{
    path: 'assistance-service',
    loadComponent: () => import('./assistance-service/assistance-service.component').then(c => c.AssistanceServiceComponent),
    canDeactivate: [UnsavedChangesGuard]
},
{
    path: 'ips',
    loadComponent: () => import('./ips/ips.component').then(c => c.RegisterIpsComponent)
},
{
    path: 'cups',
    loadComponent: () => import('./cups/cups.component').then(c => c.CupsComponent)
},
{
    path: 'medicines',
    loadComponent: () => import('./medicines/medicines.component').then(c => c.MedicinesComponent)
},
{
    path: 'contracts',
    loadComponent: () => import('./contracts/contracts.component').then(c => c.ContractsComponent)
},
{
    path: 'vehicles',
    loadComponent: () => import('./vehicles/vehicles.component').then(c => c.VehiclesComponent),
    canDeactivate: [UnsavedChangesGuard]
},
{
    path: 'administrative-entities',
    loadComponent: () => import('./administrative-entities/administrative-entities.component').then(c => c.AdministrativeEntitiesComponent),
    canDeactivate: [UnsavedChangesGuard]
},
{
    path: 'institutions',
    loadComponent: () => import('./institutions/institutions.component').then(c => c.InstitutionsComponent),
    canDeactivate: [UnsavedChangesGuard]
},
{
    path: 'cups-group',
    loadComponent: () => import('./cups-group/cups-group.component').then(c => c.CupsGroupComponent)
},
{
    path: 'care-programs',
    loadComponent: () => import('./care-programs/care-programs.component').then(c => c.CareProgramsComponent)
},
{
    path: 'roles',
    loadComponent: () => import('./roles-controls/roles-controls.component').then(c => c.RolesControlsComponent)
},
{
    path: 'cash-receipt-concept',
    loadComponent: () => import('./cash-receipt-concept/cash-receipt-concept.component').then(c => c.CashReceiptConceptComponent)
},
{
    path: 'adverse-events',
    loadComponent: () => import('./adverse-events/adverse-events.component').then(c => c.AdverseEventsComponent)
},
{
    path: 'diagnosis-group',
    loadComponent: () => import('./diagnosis-group/diagnosis-group.component').then(c => c.DiagnosisGroupComponent)
},
{
    path: 'cost-center',
    loadComponent: () => import('./cost-center/cost-center.component').then(c => c.CostCenterComponent)
},
{
    path: 'hospital-services',
    loadComponent: () => import('./hospital-services/hospital-services.component').then(c => c.HospitalServicesComponent),
    canDeactivate: [UnsavedChangesGuard]
},
{
    path: 'employees',
    loadComponent: () => import('./employees/employees.component').then(c => c.EmployeesComponent)
},
{
    path: 'rip-concept',
    loadComponent: () => import('./rip-concept/rip-concept.component').then(c => c.RipConceptComponent)
},
{
    path: 'diagnosis',
    loadComponent: () => import('./diagnosis/diagnosis.component').then(c => c.DiagnosisComponent)
},
{
    path: 'input-materials',
    loadComponent: () => import('./input-materials/input-materials.component').then(c => c.InputMaterialsComponent)
},
{
    path: 'procedure-pyp',
    loadComponent: () => import('./procedure-pyp/procedure-pyp.component').then(c => c.ProcedurePypComponent)
},
{
    path: 'service-programs',
    loadComponent: () => import('./service-programs/service-programs.component').then(c => c.ServiceProgramsComponent)
}
];
