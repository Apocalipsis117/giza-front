import { Route } from '@angular/router';

export const routers: Route[] = [{
    path: '',
    loadComponent: () => import('./shortcut-setting/shortcut-setting.component').then(c => c.ShortcutSettingComponent)
},
{
    path: 'material-rate-supplies',
    loadComponent: () => import('./material-rate-supplies/material-rate-supplies.component').then(c => c.MaterialRateSuppliesComponent)
},
{
    path: 'oxygen-rate',
    loadComponent: () => import('./oxygen-rate/oxygen-rate.component').then(c => c.OxygenRateComponent)
},
{
    path: 'transfer-fee',
    loadComponent: () => import('./transfer-fee/transfer-fee.component').then(c => c.TransferFeeComponent)
},
{
    path: 'medication-fee',
    loadComponent: () => import('./medication-fee/medication-fee.component').then(c => c.MedicationFeeComponent)
},
{
    path: 'tariff-manual',
    loadComponent: () => import('./tariff-manual/tariff-manual.component').then(c => c.TariffManualComponent)
},
{
    path: 'manual-input-materials',
    loadComponent: () => import('./manual-input-materials/manual-input-materials.component').then(c => c.ManualInputMaterialsComponent)
},
];
