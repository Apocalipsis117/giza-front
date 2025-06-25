import { Component } from '@angular/core';
import { TableOccupationalTherapyComponent } from './table-occupational-therapy/table-occupational-therapy.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { PanelPatientProfileComponent } from '@layouts/dashboard/panels/panel-patient-profile/panel-patient-profile.component';

@Component({
    selector: 'occupational-therapy',
    standalone: true,
    templateUrl: './occupational-therapy.component.html',
    imports: [
        TableOccupationalTherapyComponent,
        BladePanelComponent,
        BladeBoxPanelComponent,
        PanelPatientProfileComponent
    ]
})
export class OccupationalTherapyComponent {

}
