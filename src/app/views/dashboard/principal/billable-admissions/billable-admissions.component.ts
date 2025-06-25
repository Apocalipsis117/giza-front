import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BillableAdmissionsTableComponent } from './billable-admissions-table/billable-admissions-table.component';
import { BillableAdmissionsDetailComponent } from './billable-admissions-detail/billable-admissions-detail.component';

@Component({
    selector: 'billable-admissions',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        BillableAdmissionsTableComponent,
        BillableAdmissionsDetailComponent
    ],
    templateUrl: './billable-admissions.component.html'
})
export class BillableAdmissionsComponent {

}
