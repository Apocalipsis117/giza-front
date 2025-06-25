import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
  selector: 'form-referral-audit',
  standalone: true,
  imports: [InputPanelTextComponent, InputPanelSelectComponent, ButtonComponent],
  templateUrl: './form-referral-audit.component.html'
})
export class FormReferralAuditComponent {

}
