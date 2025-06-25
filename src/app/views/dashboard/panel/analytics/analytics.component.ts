import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsPanelsComponent } from '@layouts/dashboard/blades/blade-tabs-panels/blade-tabs-panels.component';

@Component({
    selector: 'view-analytics',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeTabsPanelsComponent
    ],
    templateUrl: './analytics.component.html'
})
export class AnalyticsComponent {

}
