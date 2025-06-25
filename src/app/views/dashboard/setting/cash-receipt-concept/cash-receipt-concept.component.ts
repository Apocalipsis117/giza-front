import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormCashConceptComponent } from '@layouts/dashboard/forms/form-cash-concept/form-cash-concept.component';
import { TableCashConceptComponent } from '@layouts/dashboard/tables/table-cash-concept/table-cash-concept.component';

@Component({
    selector: 'cash-receipt-concept',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormCashConceptComponent,
        TableCashConceptComponent
    ],
    templateUrl: './cash-receipt-concept.component.html'
})
export class CashReceiptConceptComponent {

}
