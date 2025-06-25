import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';

@Component({
  selector: 'tform-hospitalization',
  standalone: true,
  imports: [
    InputPanelSelectComponent,
    InputPanelTextComponent
],
  templateUrl: './tform-hospitalization.component.html'
})
export class TformHospitalizationComponent {

}
