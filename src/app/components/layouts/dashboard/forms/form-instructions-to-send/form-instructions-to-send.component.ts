import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';

@Component({
    selector: 'form-instructions-to-send',
    standalone: true,
    imports: [CommonModule, InputPanelTextComponent, InputPanelSelectComponent],
    templateUrl: './form-instructions-to-send.component.html'
})
export class FormInstructionsToSendComponent {

}
