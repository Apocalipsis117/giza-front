import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormCupsGroupComponent } from './form-cups-group/form-cups-group.component';
import { TableCupsGroupComponent } from './table-cups-group/table-cups-group.component';

@Component({
    selector: 'cups-group',
    standalone: true,
    imports: [
        BladePanelComponent,
        FormCupsGroupComponent,
        BladeBoxPanelComponent,
        TableCupsGroupComponent
    ],
    templateUrl: './cups-group.component.html'
})
export class CupsGroupComponent {

}
