import { Component, computed, inject, signal } from '@angular/core';
import { OxigenRateAPP } from '@interfaces/app';
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
    oxigenRate = signal<OxigenRateAPP | null>(null);
    localServ = inject(LocalOxygenRateService);

    ngOnInit(): void {
        this.localServ.oxigenRate.subscribe(data => this.oxigenRate.set(data));
    }

    oxigenRateData = computed(() => {
        return {
            title: this.oxigenRate()!.name,
            medicineName: this.oxigenRate()!.medication.name,
            value: this.oxigenRate()!.value,
            medicineArea: this.oxigenRate()!.medication.costCenter.area?.name,
            medicineCenterCost: this.oxigenRate()!.medication.costCenter.name,
            medicineType: this.oxigenRate()!.medication ? this.oxigenRate()!.medication!.medicineType!.name : '',
            pharmaceuticalForm: this.oxigenRate()!.medication.pharmaceuticalForm.name,
            serviceTypes: this.oxigenRate()!.medication.serviceTypes.name
        }
    })
}
