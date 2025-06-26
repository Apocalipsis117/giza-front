import { Component, computed, inject, signal } from '@angular/core';
import { LocalAdministrativeEntitiesService } from '../local-administrative-entities.service';
import { AdministrativeEntity_APP } from '@interfaces/index';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';

@Component({
    selector: 'tdetail-administrative-entity',
    standalone: true,
    templateUrl: './tdetail-administrative-entity.component.html',
    imports: [BlockSwitchStatusComponent]
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
            taxId: this.data()!.taxId,
            regimeName: this.data()!.regime.name,
            address: this.data()!.address,
            filingAddress: this.data()!.filingAddress,
            isActive: this.data()!.isActive,
            hasInsurance: this.data()!.hasInsurance,
            ripsTaxIdVerification: this.data()!.ripsTaxIdVerification,
            requiresAnnex2: this.data()!.requiresAnnex2
        }
    })
}
