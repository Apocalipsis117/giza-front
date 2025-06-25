import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
  selector: 'form-packoff',
  standalone: true,
  imports: [
    InputPanelTextComponent,
    InputPanelSelectComponent
],
  templateUrl: './form-packoff.component.html'
})
export class FormPackoffComponent {

}
