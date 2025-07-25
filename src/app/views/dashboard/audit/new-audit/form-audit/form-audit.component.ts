import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';

@Component({
  selector: 'form-audit',
  standalone: true,
  imports: [
    InputPanelTextComponent,
    InputPanelSelectComponent,
    InputPanelTimeComponent
],
  templateUrl: './form-audit.component.html'
})
export class FormAuditComponent {

}
