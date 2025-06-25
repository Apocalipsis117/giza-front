import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'form-gloss-date-receipt',
    standalone: true,
    imports: [InputPanelTextComponent, InputPanelSelectComponent],
    templateUrl: './form-gloss-date-receipt.component.html'
})
export class FormGlossDateReceiptComponent {

}
