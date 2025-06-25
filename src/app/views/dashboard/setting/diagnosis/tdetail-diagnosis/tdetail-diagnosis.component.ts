import { Component, computed, inject, signal } from '@angular/core';
import { DiagnosisAPP } from '@interfaces/app';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalDiagnosisService } from '../local-diagnosis.service';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';

@Component({
    selector: 'tdetail-diagnosis',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent,
        BadgeStatusComponent
    ],
    templateUrl: './tdetail-diagnosis.component.html'
})
export class TdetailDiagnosisComponent {
    data = signal<DiagnosisAPP | null>(null);
    localServ = inject(LocalDiagnosisService);

    ngOnInit(): void {
        this.localServ.watchData.subscribe(data => this.data.set(data));
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
            code: this.data()!.code,
            minAge: this.data()!.minAge,
            maxAge: this.data()!.maxAge,
            notify: this.data()!.notify,
            procedure: this.data()!.procedure,
            hospitalization: this.data()!.hospitalization,
            common: this.data()!.common,
            active: this.data()!.active,
            genderName: this.data()!.gender.name,
            categoryName: this.data()!.diagnosisCategory.name,
            categoryRange: this.data()!.diagnosisCategory.range,
            charterName: this.data()!.diagnosisCategory.diagnosisChapter.name
        }
    });
}
