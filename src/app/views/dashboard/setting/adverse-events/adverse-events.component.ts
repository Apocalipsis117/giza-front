import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';

@Component({
    selector: 'adverse-events',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent
    ],
    templateUrl: './adverse-events.component.html'
})
export class AdverseEventsComponent {

}
