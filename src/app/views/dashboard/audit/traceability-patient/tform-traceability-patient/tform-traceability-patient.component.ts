import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'tform-traceability-patient',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent
    ],
    templateUrl: './tform-traceability-patient.component.html'
})
export class TformTraceabilityPatientComponent {

}
