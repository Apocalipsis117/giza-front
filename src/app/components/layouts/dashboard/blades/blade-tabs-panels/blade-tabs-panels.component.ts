import { Component } from '@angular/core';
import { TabsPanelHomeComponent } from '@layouts/dashboard/tabs/tabs-panel-home/tabs-panel-home.component';

@Component({
    selector: 'blade-tabs-panels',
    standalone: true,
    imports: [
        TabsPanelHomeComponent
    ],
    templateUrl: './blade-tabs-panels.component.html'
})
export class BladeTabsPanelsComponent {

}
