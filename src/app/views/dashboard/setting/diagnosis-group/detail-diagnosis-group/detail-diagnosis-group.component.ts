import { Component, computed, inject, signal } from '@angular/core';
import { DiagnosisGroup_APP } from '@interfaces/index';
import { LocalDiagnosisGroupService } from '../local-diagnosis-group.service';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';
import { DetailDiagnosisComponent } from '../../diagnosis/detail-diagnosis/detail-diagnosis.component';

@Component({
    selector: 'detail-diagnosis-group',
    imports: [
        SelectSomeItemComponent,
        BladeCollapseBlockComponent,
        BladeBoxCollapseComponent,
        DetailDiagnosisComponent
    ],
    templateUrl: './detail-diagnosis-group.component.html'
})
export class DetailDiagnosisGroupComponent {
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
