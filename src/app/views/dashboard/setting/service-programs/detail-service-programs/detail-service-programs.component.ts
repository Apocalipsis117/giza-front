import { Component, computed, input } from '@angular/core';
import { ServicePrograms_APP } from '@interfaces/index';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';

@Component({
    selector: 'detail-service-programs',
    imports: [
        SelectSomeItemComponent
    ],
    templateUrl: './detail-service-programs.component.html'
})
export class DetailServiceProgramsComponent {
    data = input<ServicePrograms_APP | null>(null);

    value = computed(() => {
        const _ = this.data()!;
        return {
            name: _.name,
            code: _.code,
            component: _.component,
            minAge: _.minAge,
            maxAge: _.maxAge,
            gender: _.gender.name,
            carePrograms: _.carePrograms,
            externalCause: _.externalCause.name,
            consultationPurpose: _.consultationPurpose.name
        };
    });
}
