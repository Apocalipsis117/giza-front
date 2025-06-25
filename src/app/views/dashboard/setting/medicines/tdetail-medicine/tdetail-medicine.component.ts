import { Component, computed, inject, signal } from '@angular/core';
import { MedicineAPP } from '@interfaces/app';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalMedicineService } from '../local-medicine.service';

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
    data = signal<MedicineAPP | null>(null);
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
            cumCons: this.data()?.cumCons ? this.data()!.cumCons : '',
            cumName: this.data()!.cumName,
            referenceUnit: this.data()?.referenceUnit ? this.data()!.referenceUnit : '',
            otherName: this.data()!.otherName,
            adverseEffect: this.data()?.adverseEffect ? this.data()!.adverseEffect : 'Ninguno',
            contraindications: this.data()?.contraindications ? this.data()!.contraindications : 'Ninguno',
            interactionIncompatibility: this.data()?.interactionIncompatibility ? this.data()!.interactionIncompatibility : 'Ninguno',
            isLiquid: this.data()!.isLiquid,
            isActive: this.data()!.isActive,
            medicineTypeName: this.data()?.medicineType ? this.data()!.medicineType!.name : '',
            measurementUnit: this.data()?.measurementUnit ? this.data()!.measurementUnit : '',
            concentration: this.data()?.concentration ? this.data()!.concentration!.name : '',
        }
    });
}
