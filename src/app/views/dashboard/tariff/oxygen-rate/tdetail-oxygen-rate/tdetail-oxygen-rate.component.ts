import { Component, computed, inject, signal } from '@angular/core';
import { OxygenRate_APP } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { LocalOxygenRateService } from '../local-oxygen-rate.service';
import { TdetailMedicineComponent } from '@views/dashboard/setting/medicines/tdetail-medicine/tdetail-medicine.component';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'tdetail-oxygen-rate',
    standalone: true,
    imports: [
        CurrencyPipe,
        SelectSomeItemComponent,
        TdetailMedicineComponent
    ],
    templateUrl: './tdetail-oxygen-rate.component.html'
})
export class TdetailOxygenRateComponent {
    data = signal<OxygenRate_APP | null>(null);
    local$ = inject(LocalOxygenRateService);

    ngOnInit(): void {
        this.local$.readEntity$.subscribe({
            next: (value) => {
                this.data.set(value)
            }
        });
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            value: this.data()!.value,
            medicine: this.data()!.medicine
        }
    })
}
