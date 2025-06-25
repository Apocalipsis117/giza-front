import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableMedicationFeeComponent } from '@layouts/dashboard/tables/table-medication-fee/table-medication-fee.component';

@Component({
    selector: 'medication-fee',
    standalone: true,
    templateUrl: './medication-fee.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableMedicationFeeComponent
    ]
})
export class MedicationFeeComponent {

}
