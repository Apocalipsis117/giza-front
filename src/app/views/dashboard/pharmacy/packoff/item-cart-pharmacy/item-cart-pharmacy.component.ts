import { Component } from '@angular/core';
import { InputPanelNumberComponent } from '@form-control/input-panel-number/input-panel-number.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
  selector: 'item-cart-pharmacy',
  standalone: true,
  imports: [
    ButtonComponent,
    InputPanelNumberComponent
],
  templateUrl: './item-cart-pharmacy.component.html'
})
export class ItemCartPharmacyComponent {

}
