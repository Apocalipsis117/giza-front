import { Component, computed, inject, output, signal } from '@angular/core';
import { LocalAdministrativeEntitiesService } from '../local-administrative-entities.service';
import { AdministrativeEntity_APP } from '@interfaces/index';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';

@Component({
    selector: 'tdetail-administrative-entity',
    standalone: true,
    templateUrl: './tdetail-administrative-entity.component.html',
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent
    ]
})
export class TdetailAdministrativeEntityComponent {
    private readonly local$ = inject(LocalAdministrativeEntitiesService);
    data = signal<AdministrativeEntity_APP | null>(null);

    ngOnInit(): void {
        this.local$.readEntity$.subscribe(data => {
            this.data.set(data);
        })
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            code: this.data()!.code,
            nit: this.data()!.nit,
            regimeName: this.data()!.regime.name,
            address: this.data()!.address,
            filingAddress: this.data()!.filingAddress,
            isActive: this.data()!.status,
            hasInsurance: this.data()!.soat,
            requiresAnnex2: this.data()!.requiresAnnex2,
            reportResolution256: this.data()!.reportResolution256,
            templateResolution1552: this.data()!.templateResolution1552,
            municipaly: this.data()!.municipality.name,
            departmanet: this.data()!.department.name,
            phone: this.data()!.phone,
            length: this.data()!.authorizationLength,
            email: this.data()!.email,
            emailF: this.data()!.electronicBillingEmail
        }
    })
}
