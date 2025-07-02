import { Component, computed, inject, signal } from '@angular/core';
import { OxygenRate_APP } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { LocalOxygenRateService } from '../local-oxygen-rate.service';

@Component({
    selector: 'tdetail-oxygen-rate',
    standalone: true,
    imports: [
        SelectSomeItemComponent
    ],
    templateUrl: './tdetail-oxygen-rate.component.html'
})
export class TdetailOxygenRateComponent {
    oxigenRate = signal<OxygenRate_APP | null>(null);
    local$ = inject(LocalOxygenRateService);

    ngOnInit(): void {
        this.local$.oxigenRate.subscribe(data => this.oxigenRate.set(data));
    }

    oxigenRateData = computed(() => {
        return {
            title: this.oxigenRate()!.name,
            medicineName: 'queso',
            value: this.oxigenRate()!.value,
            medicineArea: 'queso',
            medicineCenterCost: 'queso',
            medicineType: 'queso',
            pharmaceuticalForm: 'queso',
            serviceTypes: 'queso'
        }
    })
}
