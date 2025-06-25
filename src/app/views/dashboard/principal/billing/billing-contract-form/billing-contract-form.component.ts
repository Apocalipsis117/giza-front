import { Component } from '@angular/core';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { InputReadonlyComponent } from '@form-control/input-readonly/input-readonly.component';

@Component({
    selector: 'billing-contract-form',
    standalone: true,
    imports: [
        InputPanelTextareaComponent,
        InputReadonlyComponent
    ],
    templateUrl: './billing-contract-form.component.html'
})
export class BillingContractFormComponent {
}
