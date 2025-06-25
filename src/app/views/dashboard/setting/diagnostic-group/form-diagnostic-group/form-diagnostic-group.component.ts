import { Component } from '@angular/core';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'form-diagnostic-group',
    standalone: true,
    imports: [
        InputPanelTextComponent
    ],
    templateUrl: './form-diagnostic-group.component.html'
})
export class FormDiagnosticGroupComponent {

}
