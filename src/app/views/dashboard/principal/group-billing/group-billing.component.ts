import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { GroupBillingFormComponent } from './group-billing-form/group-billing-form.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { GroupBillingTableComponent } from './group-billing-table/group-billing-table.component';
import { GroupBillingDetailComponent } from './group-billing-detail/group-billing-detail.component';
import { BarActions } from '@interfaces/index';

@Component({
    selector: 'group-billing',
    standalone: true,
    imports: [
        BladePanelComponent,
        GroupBillingFormComponent,
        BladeBoxPanelComponent,
        GroupBillingTableComponent,
        GroupBillingDetailComponent
    ],
    templateUrl: './group-billing.component.html'
})
export class GroupBillingComponent {
    actionsBar: BarActions = {
        edit: true,
        delete: true,
        clean: true
    };
}
