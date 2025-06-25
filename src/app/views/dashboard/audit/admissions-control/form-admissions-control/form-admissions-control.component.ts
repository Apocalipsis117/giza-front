import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'form-admissions-control',
    standalone: true,
    imports: [InputPanelTextComponent, InputPanelSelectComponent],
    templateUrl: './form-admissions-control.component.html'
})
export class FormAdmissionsControlComponent {

}
