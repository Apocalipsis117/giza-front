import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'tform-invoice-support',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent
    ],
    templateUrl: './tform-invoice-support.component.html'
})
export class TformInvoiceSupportComponent {

}
