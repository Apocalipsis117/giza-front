import { Component } from '@angular/core';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'tform-physical-therapy',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        ButtonComponent
    ],
    templateUrl: './tform-physical-therapy.component.html'
})
export class TformPhysicalTherapyComponent {

}
