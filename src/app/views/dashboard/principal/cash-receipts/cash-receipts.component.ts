import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CashReceiptsTableComponent } from './cash-receipts-table/cash-receipts-table.component';
import { CashReceiptsDetailsComponent } from './cash-receipts-details/cash-receipts-details.component';

@Component({
    selector: 'cash-receipts',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        CashReceiptsTableComponent,
        CashReceiptsDetailsComponent
    ],
    templateUrl: './cash-receipts.component.html'
})
export class CashReceiptsComponent {

}
