import { Component, inject, signal } from '@angular/core';
import { LocalContractsService } from '../local-contracts.service';
import { Contract_APP } from '@interfaces/index';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';

@Component({
    selector: 'detail-contracts',
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent
    ],
    templateUrl: './detail-contracts.component.html'
})
export class DetailContractsComponent {
    private readonly local$ = inject(LocalContractsService);
    data = signal<Contract_APP | null>(null);

    ngOnInit(): void {
        this.local$.readEntity$.subscribe(data => {
            this.data.set(data);
        })
    }
}
