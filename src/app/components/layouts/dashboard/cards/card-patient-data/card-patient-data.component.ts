import { Component, computed, input } from '@angular/core';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { BlockItemInfoComponent } from '@layouts/dashboard/block/block-item-info/block-item-info.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';

@Component({
    selector: 'card-patient-data',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent,
        BlockItemInfoComponent,
        BladeBoxTitleComponent
    ],
    templateUrl: './card-patient-data.component.html'
})
export class CardPatientDataComponent {
    data = input<any | null>(null);

    value = computed(() => {
        return {
            name: this.data()!.name,
        };
    });
}
