import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';

@Component({
    selector: 'form-hospitalization',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelTimeComponent
    ],
    templateUrl: './form-hospitalization.component.html'
})
export class FormHospitalizationComponent {

}
