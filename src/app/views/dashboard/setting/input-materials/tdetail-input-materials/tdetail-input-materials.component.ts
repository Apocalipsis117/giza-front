import { Component, computed, inject, signal } from '@angular/core';
import { LocalInputMaterialsService } from '../local-input-materials.service';
import { InputMaterials_APP } from '@interfaces/index';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';

@Component({
    selector: 'tdetail-input-materials',
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent
    ],
    templateUrl: './tdetail-input-materials.component.html'
})
export class TdetailInputMaterialsComponent {
    private readonly local$ = inject(LocalInputMaterialsService);
    data = signal<InputMaterials_APP | null>(null);

    ngOnInit(): void {
        this.local$.readEntity$.subscribe(data => {
            this.data.set(data);
        })
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            status: this.data()!.status,
            billable: this.data()!.billable,
            ripsConceptName: this.data()!.ripsConcept.name,
            classificationName: this.data()!.materialClassification.name,
            manualInputMaterials: this.data()!.manualInputMaterialsTariffs
        }
    })
}
