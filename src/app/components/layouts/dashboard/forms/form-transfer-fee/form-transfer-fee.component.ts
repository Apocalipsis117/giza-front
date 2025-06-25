import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'form-transfer-fee',
    standalone: true,
    imports: [
        InputPanelSelectComponent,
        InputPanelTextComponent
    ],
    templateUrl: './form-transfer-fee.component.html'
})
export class FormTransferFeeComponent {

}
