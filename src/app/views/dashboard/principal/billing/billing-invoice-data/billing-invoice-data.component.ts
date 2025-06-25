import { Component } from '@angular/core';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'billing-invoice-data',
    standalone: true,
    imports: [
        InputPanelTextComponent,
    ],
    templateUrl: './billing-invoice-data.component.html'
})
export class BillingInvoiceDataComponent {

}
