import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormTransferFeeComponent } from '@layouts/dashboard/forms/form-transfer-fee/form-transfer-fee.component';
import { TableTransferFeeComponent } from '@layouts/dashboard/tables/table-transfer-fee/table-transfer-fee.component';

@Component({
    selector: 'transfer-fee',
    standalone: true,
    imports: [
        BladePanelComponent,
        FormTransferFeeComponent,
        TableTransferFeeComponent,
        BladeBoxPanelComponent
    ],
    templateUrl: './transfer-fee.component.html'
})
export class TransferFeeComponent {

}
