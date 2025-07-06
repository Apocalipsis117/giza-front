import { Component, computed, inject, signal } from '@angular/core';
import { HospitalService_APP } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalHospitalServService } from '../local-hospital-serv.service';

@Component({
    selector: 'tdetail-hospital-services',
    standalone: true,
    imports: [
        SelectSomeItemComponent,
        BlockSwitchStatusComponent
    ],
    templateUrl: './tdetail-hospital-services.component.html'
})
export class TdetailHospitalServicesComponent {
    private readonly local$ = inject(LocalHospitalServService);
    data = signal<HospitalService_APP | null>(null);

    ngOnInit(): void {
        this.local$.assistanceServ.subscribe(data => this.data.set(data))
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            bedCount: this.data()!.bedCount,
            costCenter: this.data()!.costCenter.name,
            costCenterArea: this.data()!.costCenter.area?.name,
            costCenterAccount: this.data()!.costCenter.accountingAccount,
            gender: this.data()!.gender.name,
            maxAge: this.data()!.maxAge,
            minAge: this.data()!.minAge,
            scope: this.data()!.scope.name,
            status: this.data()!.status,
        }
    })
}
