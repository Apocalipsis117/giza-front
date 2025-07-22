import { Component, computed, input } from '@angular/core';
import { TypeHistory_APP } from '@interfaces/index';

@Component({
  selector: 'detail-type-history',
  imports: [],
  templateUrl: './detail-type-history.component.html'
})
export class DetailTypeHistoryComponent {
    public readonly data = input<TypeHistory_APP|null>(null);

    value = computed(() => {
        const _ = this.data()!;
        return {
            name: _.name,
            minAge: _.minAge,
            maxAge: _.maxAge,
            pyp: _.pyp,
            withExtension: _.withExtension
        };
    });
}
