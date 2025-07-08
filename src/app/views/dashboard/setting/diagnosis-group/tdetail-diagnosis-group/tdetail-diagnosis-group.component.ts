import { Component, computed, inject, signal } from '@angular/core';
import { DiagnosisGroup_APP } from '@interfaces/index';
import { LocalDiagnosisGroupService } from '../local-diagnosis-group.service';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';
import { TdetailDiagnosisComponent } from '../../diagnosis/tdetail-diagnosis/tdetail-diagnosis.component';

@Component({
    selector: 'tdetail-diagnosis-group',
    imports: [
        SelectSomeItemComponent,
        BladeCollapseBlockComponent,
        BladeBoxCollapseComponent,
        TdetailDiagnosisComponent
    ],
    templateUrl: './tdetail-diagnosis-group.component.html'
})
export class TdetailDiagnosisGroupComponent {
    private readonly local$ = inject(LocalDiagnosisGroupService);
    data = signal<DiagnosisGroup_APP | null>(null);

    ngOnInit(): void {
        this.local$.readEntity$.subscribe(data => {
            this.data.set(data);
        })
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            Diagnosis: this.data()!.diagnoses
        }
    })
}
