import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
  selector: 'form-table-invoice',
  standalone: true,
  imports: [InputPanelTextComponent, InputPanelSelectComponent, ButtonComponent],
  templateUrl: './form-table-invoice.component.html'
})
export class FormTableInvoiceComponent {

}
