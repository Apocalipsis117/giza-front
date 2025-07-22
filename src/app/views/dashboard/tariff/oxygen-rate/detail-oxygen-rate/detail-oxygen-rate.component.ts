import { Component, computed, inject, signal } from '@angular/core';
import { OxygenRate_APP } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { LocalOxygenRateService } from '../local-oxygen-rate.service';
import { DetailMedicineComponent } from '@views/dashboard/setting/medicines/detail-medicine/detail-medicine.component';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'detail-oxygen-rate',
    standalone: true,
    imports: [
        CurrencyPipe,
        SelectSomeItemComponent,
        DetailMedicineComponent
    ],
    templateUrl: './detail-oxygen-rate.component.html'
})
export class DetailOxygenRateComponent {
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
