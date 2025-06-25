import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormRolesComponent } from "./form-roles/form-roles.component";
import { TableRolesComponent } from "./table-roles/table-roles.component";

@Component({
    selector: 'roles-controls',
    standalone: true,
    templateUrl: './roles-controls.component.html',
    imports: [BladePanelComponent, FormRolesComponent, TableRolesComponent, BladeBoxPanelComponent]
})
export class RolesControlsComponent {

}
