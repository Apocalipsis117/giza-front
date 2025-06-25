import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { MenuAsideConfigComponent } from '@layouts/dashboard/menus/menu-aside-config/menu-aside-config.component';

@Component({
    selector: 'config',
    standalone: true,
    imports: [
        RouterOutlet,
        BladePanelComponent,
        MenuAsideConfigComponent
    ],
    templateUrl: './config.component.html'
})
export class ConfigComponent {

}
