import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CashReceiptDetailComponent } from './cash-receipt-detail/cash-receipt-detail.component';
import { CashReceiptTableComponent } from './cash-receipt-table/cash-receipt-table.component';

@Component({
    selector: 'cash-receipt',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        CashReceiptDetailComponent,
        CashReceiptTableComponent
    ],
    templateUrl: './cash-receipt.component.html'
})
export class CashReceiptComponent {

}
