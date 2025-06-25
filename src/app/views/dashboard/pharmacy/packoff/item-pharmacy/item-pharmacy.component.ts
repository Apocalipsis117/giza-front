import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { transform } from '@helpers/index';
import { UiSize } from '@interfaces/index';

@Component({
  selector: 'item-pharmacy',
  standalone: true,
  imports: [NgClass],
  templateUrl: './item-pharmacy.component.html'
})
export class ItemPharmacyComponent {
    @Input() data: any;
    @Input() uiItem: UiSize = 'lg';

    get name() {
        return this.data ? this.data.display.find((x: any) => x.lang === 'es').name : ''
    }

    get icon() {
        return this.data ? this.data.icon : '';
    }

    get category() {
        return this.data ? this.data.inventory.category : '';
    }

    get ui() {
        return `ui-${this.uiItem}`
    }

    get quantity() {
        let display = 'Undefined';
        if(this.data) {
            display = transform.textPlural(this.data.inventory.quantity, {
                quantity: Number(this.data.inventory.quantity),
                textPlural: 'Unidades',
                textSingular: 'Unidad'
            });
        }
        return display;
    }
}
