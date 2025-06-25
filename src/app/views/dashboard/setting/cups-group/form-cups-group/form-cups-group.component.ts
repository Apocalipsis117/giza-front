import { Component } from '@angular/core';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'form-cups-group',
    standalone: true,
    imports: [InputPanelTextComponent, InputPanelSelectComponent, InputPanelCheckboxComponent],
    templateUrl: './form-cups-group.component.html'
})
export class FormCupsGroupComponent {

}
