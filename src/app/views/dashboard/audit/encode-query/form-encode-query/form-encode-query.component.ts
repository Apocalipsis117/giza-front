import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'form-encode-query',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent
    ],
    templateUrl: './form-encode-query.component.html'
})
export class FormEncodeQueryComponent {

}
