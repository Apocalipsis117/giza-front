import { Route } from '@angular/router';

export const routers: Route[] = [{
    path: '',
    loadComponent: () => import('./shortcut-audit/shortcut-audit.component').then(c => c.ShortcutAuditComponent)
},{
    path: 'invoice',
    loadComponent: () => import('./invoice/invoice.component').then(c => c.InvoiceComponent)
},{
    path: 'encode-query',
    loadComponent: () => import('./encode-query/encode-query.component').then(c => c.EncodeQueryComponent)
},{
    path: 'referral-audit',
    loadComponent: () => import('./referral-audit/referral-audit.component').then(c => c.ReferralAuditComponent)
},{
    path: 'gloss-date-receipt',
    loadComponent: () => import('./gloss-date-receipt/gloss-date-receipt.component').then(c => c.GlossDateReceiptComponent)
},{
    path: 'admissions-control',
    loadComponent: () => import('./admissions-control/admissions-control.component').then(c => c.AdmissionsControlComponent)
},{
    path: 'gloss-by-validity',
    loadComponent: () => import('./gloss-by-validity/gloss-by-validity.component').then(c => c.GlossByValidityComponent)
},{
    path: 'pending-glosses',
    loadComponent: () => import('./pending-glosses/pending-glosses.component').then(c => c.PendingGlossesComponent)
},{
    path: 'new-audit',
    loadComponent: () => import('./new-audit/new-audit.component').then(c => c.NewAuditComponent)
},{
    path: 'invoice-support',
    loadComponent: () => import('./invoice-support/invoice-support.component').then(c => c.InvoiceSupportComponent)
},{
    path: 'unfiled-invoices',
    loadComponent: () => import('./unfiled-invoices/unfiled-invoices.component').then(c => c.UnfiledInvoicesComponent)
},{
    path: 'traceability-patient',
    loadComponent: () => import('./traceability-patient/traceability-patient.component').then(c => c.TraceabilityPatientComponent)
}];
