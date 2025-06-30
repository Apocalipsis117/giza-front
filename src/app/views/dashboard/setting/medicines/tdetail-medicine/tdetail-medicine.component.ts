import { Component, computed, inject, signal } from '@angular/core';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalMedicineService } from '../local-medicine.service';
import { Medicine_APP } from '@interfaces/index';

@Component({
    selector: 'tdetail-medicine',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent
    ],
    templateUrl: './tdetail-medicine.component.html'
})
export class TdetailMedicineComponent {
    data = signal<Medicine_APP | null>(null);
    localServ = inject(LocalMedicineService);

    ngOnInit(): void {
        this.localServ.watchData.subscribe(data => this.data.set(data));
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            code: this.data()!.code,
            atc: this.data()!.atc,
            cum: this.data()?.cum ? this.data()!.cum : '',
            cumCons: 'queso',
            cumName: this.data()!.cumName,
            referenceUnit: this.data()?.referenceUnit ? this.data()!.referenceUnit : '',
            otherName: this.data()!.otherName,
            adverseEffect: this.data()?.adverseEffect ? this.data()!.adverseEffect : 'Ninguno',
            contraindications: this.data()?.contraindications ? this.data()!.contraindications : 'Ninguno',
            interactionIncompatibility: this.data()?.interactionIncompatibility ? this.data()!.interactionIncompatibility : 'Ninguno',
            isLiquid:  'queso',
            isActive:  'queso',
            medicineTypeName:  'queso',
            measurementUnit:  'queso',
            concentration:  'queso',
        }
    });
}
