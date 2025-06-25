import { NgClass } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { UiSize } from '@interfaces/index';
import { BtnsPaginateComponent } from '@layouts/dashboard/btns/btns-paginate/btns-paginate.component';
import { PharmacyFakeService } from '@services/app';
import { ItemPharmacyComponent } from '../item-pharmacy/item-pharmacy.component';

@Component({
    selector: 'items-pharmacy',
    standalone: true,
    templateUrl: './items-pharmacy.component.html',
    imports: [
        NgClass,
        ItemPharmacyComponent,
        BtnsPaginateComponent
    ]
})
export class ItemsPharmacyComponent {
    public setUiList = input<UiSize>(null);
    fakeItems = inject(PharmacyFakeService);

    items = signal<any[]>([]);

    ngOnInit(): void {
        this.getItems();
    }

    uiList = computed(() => {
        let colSpan: string = 'grid-cols-1 gap-1';
        if(this.setUiList() === 'sm'){
            colSpan = 'grid-cols-5 gap-3'
        }
        return {
            ui: this.setUiList(),
            colSpan
        }
    })

    getItems() {
        this.fakeItems.items.subscribe(data => this.items.set(data.data.itmes))
    }
}
