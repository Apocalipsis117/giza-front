import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
  selector: 'form-reports',
  standalone: true,
  imports: [CommonModule, InputPanelCheckboxComponent, InputPanelSelectComponent, ButtonComponent],
  templateUrl: './form-reports.component.html'
})
export class FormReportsComponent {

}
