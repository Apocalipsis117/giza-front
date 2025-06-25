import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TablePriorityQueriesComponent } from "./table-priority-queries/table-priority-queries.component";
import { PanelPatientProfileComponent } from '@layouts/dashboard/panels/panel-patient-profile/panel-patient-profile.component';

@Component({
    selector: 'priority-queries',
    standalone: true,
    templateUrl: './priority-queries.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TablePriorityQueriesComponent,
        PanelPatientProfileComponent
    ]
})
export class PriorityQueriesComponent {

}
