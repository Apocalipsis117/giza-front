import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
    selector: 'form-care-programs',
    standalone: true,
    imports: [InputPanelTextComponent, InputPanelSelectComponent],
    templateUrl: './form-care-programs.component.html'
})
export class FormCareProgramsComponent {

}
