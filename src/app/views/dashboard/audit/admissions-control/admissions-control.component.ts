import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableAdmissionsControlComponent } from './table-admissions-control/table-admissions-control.component';

@Component({
    selector: 'admissions-control',
    standalone: true,
    imports: [BladePanelComponent, BladeBoxPanelComponent, TableAdmissionsControlComponent],
    templateUrl: './admissions-control.component.html'
})
export class AdmissionsControlComponent {

}
