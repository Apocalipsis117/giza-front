import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TabsPanelHomeComponent } from '@layouts/dashboard/tabs/tabs-panel-home/tabs-panel-home.component';

@Component({
    selector: 'panel',
    imports: [
        RouterOutlet,
        BladePanelComponent,
        TabsPanelHomeComponent
    ],
    templateUrl: './panel.component.html'
})
export class PanelComponent {

}
