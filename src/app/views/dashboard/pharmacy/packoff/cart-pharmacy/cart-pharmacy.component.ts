import { Component } from '@angular/core';
import { ItemCartPharmacyComponent } from '../item-cart-pharmacy/item-cart-pharmacy.component';

@Component({
    selector: 'cart-pharmacy',
    standalone: true,
    imports: [
        ItemCartPharmacyComponent
    ],
    templateUrl: './cart-pharmacy.component.html'
})
export class CartPharmacyComponent {

}
