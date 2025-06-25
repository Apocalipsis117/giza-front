import { Component } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeBoxUiComponent } from '@layouts/dashboard/blades/blade-box-ui/blade-box-ui.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { BillingContractFormComponent } from './billing-contract-form/billing-contract-form.component';
import { BillingEnableFormComponent } from './billing-enable-form/billing-enable-form.component';
import { BillingInvoiceDataComponent } from './billing-invoice-data/billing-invoice-data.component';
import { BillingPatientDataComponent } from './billing-patient-data/billing-patient-data.component';
import { tabsControls_billing, tabsControls_billing_services } from './billing.env';

@Component({
    selector: 'view-billing',
    standalone: true,
    imports: [
        BladePanelComponent,
        BillingInvoiceDataComponent,
        BillingPatientDataComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        BladeBoxUiComponent,
        BillingContractFormComponent,
        BillingEnableFormComponent,
        BladeBoxPanelComponent
    ],
    templateUrl: './billing.component.html'
})
export class BillingComponent {
    tabsControls = tabsControls_billing;
    tabsControls_services = tabsControls_billing_services;
}
