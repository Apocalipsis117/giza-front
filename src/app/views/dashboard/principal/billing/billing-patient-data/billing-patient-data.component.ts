import { Component } from '@angular/core';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';

@Component({
    selector: 'billing-patient-data',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelTimeComponent
    ],
    templateUrl: './billing-patient-data.component.html'
})
export class BillingPatientDataComponent {

}
