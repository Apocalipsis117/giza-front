import { Component } from '@angular/core';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'tform-pending-glosses',
    standalone: true,
    imports: [
        InputPanelSelectComponent,
        InputPanelTextComponent,
        InputPanelCheckboxComponent
    ],
    templateUrl: './tform-pending-glosses.component.html'
})
export class TformPendingGlossesComponent {

}
