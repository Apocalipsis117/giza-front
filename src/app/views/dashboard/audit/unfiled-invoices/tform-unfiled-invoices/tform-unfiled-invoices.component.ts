import { Component } from '@angular/core';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'tform-unfiled-invoices',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelCheckboxComponent
    ],
    templateUrl: './tform-unfiled-invoices.component.html'
})
export class TformUnfiledInvoicesComponent {

}
