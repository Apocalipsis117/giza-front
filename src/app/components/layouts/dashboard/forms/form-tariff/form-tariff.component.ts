import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { ListTranferComponent } from '@layouts/dashboard/lists/list-tranfer/list-tranfer.component';

@Component({
  selector: 'form-tariff',
  standalone: true,
  imports: [CommonModule, InputPanelTextComponent, InputPanelCheckboxComponent, InputPanelSelectComponent, ListTranferComponent],
  templateUrl: './form-tariff.component.html'
})
export class FormTariffComponent {

}
