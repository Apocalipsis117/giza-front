import { Component, signal } from '@angular/core';
import { UiSize } from '@interfaces/index';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladeModalComponent } from '@layouts/dashboard/blades/blade-modal/blade-modal.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { CartPharmacyComponent } from './cart-pharmacy/cart-pharmacy.component';
import { FormControlItemsComponent } from './form-control-items/form-control-items.component';
import { FormPackoffComponent } from './form-packoff/form-packoff.component';
import { ItemsPharmacyComponent } from './items-pharmacy/items-pharmacy.component';

@Component({
    selector: 'app-packoff',
    standalone: true,
    imports: [
        BladePanelComponent,
        FormPackoffComponent,
        FormControlItemsComponent,
        ItemsPharmacyComponent,
        BladeModalComponent,
        BladeBoxPanelComponent,
        CartPharmacyComponent
    ],
    templateUrl: './packoff.component.html'
})
export class PackoffComponent {
    setUiList = signal<UiSize>('sm');
    changeUiList(e: any) {
        this.setUiList.set(e);
    }
}
