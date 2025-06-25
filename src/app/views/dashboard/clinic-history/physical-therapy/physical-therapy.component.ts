import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TablePhysicalTherapyComponent } from "./table-physical-therapy/table-physical-therapy.component";
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';

@Component({
    selector: 'physical-therapy',
    standalone: true,
    templateUrl: './physical-therapy.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TablePhysicalTherapyComponent
    ]
})
export class PhysicalTherapyComponent {

}
