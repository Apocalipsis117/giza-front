import { Component } from '@angular/core';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'tform-patients-emergency',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        ButtonComponent
    ],
    templateUrl: './tform-patients-emergency.component.html'
})
export class TformPatientsEmergencyComponent {

}
