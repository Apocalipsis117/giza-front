import { Component, computed, inject, signal } from '@angular/core';
import { HospitalServiceAPP } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';
import { LocalHospitalServService } from '../local-hospital-serv.service';

@Component({
    selector: 'tdetail-hospital-services',
    standalone: true,
    imports: [
        SelectSomeItemComponent,
        BadgeStatusComponent
    ],
    templateUrl: './tdetail-hospital-services.component.html'
})
export class TdetailHospitalServicesComponent {
    data = signal<HospitalServiceAPP | null>(null);
    localServ = inject(LocalHospitalServService);

    ngOnInit(): void {
        this.localServ.hospitalServ.subscribe(data => this.data.set(data));
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            minAge: this.data()!.minAge,
            maxAge: this.data()!.maxAge,
            isActive: this.data()!.isActive,
            bedCount: this.data()!.bedCount,
            gender: this.data()!.gender.name,
            scope: this.data()!.scope.name,
            costCenter: this.data()!.costCenter.name,
            accountingAccount: this.data()!.costCenter.accountingAccount,
            area: this.data()!.costCenter.area ? this.data()!.costCenter!.area?.name : 'N/A'
        }
    })
}
