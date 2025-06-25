import { Component } from '@angular/core';
import { FormMaterialSuppliesComponent } from './form-material-supplies/form-material-supplies.component';
import { TableMaterialSuppliesComponent } from './table-material-supplies/table-material-supplies.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';

@Component({
    selector: 'material-rate-supplies',
    standalone: true,
    imports: [
        FormMaterialSuppliesComponent,
        TableMaterialSuppliesComponent,
        BladePanelComponent,
        BladeBoxPanelComponent
    ],
    templateUrl: './material-rate-supplies.component.html'
})
export class MaterialRateSuppliesComponent {

}
