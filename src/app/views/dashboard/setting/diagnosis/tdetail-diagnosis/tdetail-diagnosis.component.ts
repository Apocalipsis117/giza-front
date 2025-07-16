import { Component, computed, inject, input } from '@angular/core';
import { Diagnosis_APP } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { LocalDiagnosisService } from '../local-diagnosis.service';

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

    value = computed(() => {
        const _ = this.data()!;
        return {
            name: _.name,
            code: _.code,
            minAge: _.minAge,
            maxAge: _.maxAge,
            notify: _.notify,
            procedure: _.procedure,
            hospitalization: _.hospitalization,
            common: _.common,
            active: _.active,
            categoryName: _.category ? _.category.name : '',
            categoryRange: _.category ? _.category.range : '',
            chapter: _.chapter ? _.chapter.name : '',
            chapterRange: _.chapter ? _.chapter.range : '',
            gender: _.gender ? _.gender.name : '',
            subCategory: _.subCategory ? _.subCategory.name : '',
            subCategoryRabge: _.subCategory ? _.subCategory.range : '',
        }
    });
}
