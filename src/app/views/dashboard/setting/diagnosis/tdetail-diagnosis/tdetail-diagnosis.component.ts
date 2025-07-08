import { Component, computed, inject, input, signal } from '@angular/core';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalDiagnosisService } from '../local-diagnosis.service';
import { Diagnosis_APP } from '@interfaces/index';

@Component({
    selector: 'tdetail-diagnosis',
    standalone: true,
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent,
        BlockSwitchStatusComponent
    ],
    templateUrl: './tdetail-diagnosis.component.html'
})
export class TdetailDiagnosisComponent {
    data = input<Diagnosis_APP | null>(null);
    localServ = inject(LocalDiagnosisService);

    /*ngOnInit(): void {
        this.localServ.readEntity$.subscribe({
            next: (value) => {
                this.data.set(value)
            }
        });
    }*/

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
            categoryName: this.data()!.category.name,
            categoryRange: this.data()!.category.range,
            chapter: this.data()!.chapter.name,
            chapterRange: this.data()!.chapter.range,
            gender: this.data()!.gender.name,
            subCategory: this.data()!.subCategory.name,
            subCategoryRabge: this.data()!.subCategory.range,
        }
    });
}
