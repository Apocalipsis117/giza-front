import { Component } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { tabsControls } from '@interfaces/index';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { DataReferralAuditComponent } from './data-referral-audit/data-referral-audit.component';
import { FormNewReferralComponent } from './form-new-referral/form-new-referral.component';
import { TableReferralAuditComponent } from './table-referral-audit/table-referral-audit.component';

@Component({
    selector: 'referral-audit',
    standalone: true,
    imports: [
        BladePanelComponent,
        TableReferralAuditComponent,
        BladeTabsHorizontalComponent,
        FormNewReferralComponent,
        DataReferralAuditComponent,
        DirectivesModule
    ],
    templateUrl: './referral-audit.component.html'
})
export class ReferralAuditComponent {
    tabs: tabsControls[] = [
        {
            active: true,
            idConnect: 'remisiones',
            label: 'Remisiones'
        },
        {
            active: false,
            idConnect: 'remision',
            label: 'Remision'
        },
        {
            active: false,
            idConnect: 'regiter',
            label: 'Nueva'
        }
    ];
}
