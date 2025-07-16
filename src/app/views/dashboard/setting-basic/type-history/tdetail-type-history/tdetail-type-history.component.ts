import { Component, computed, input } from '@angular/core';
import { TypeHistory_APP } from '@interfaces/index';

@Component({
  selector: 'tdetail-type-history',
  imports: [],
  templateUrl: './tdetail-type-history.component.html'
})
export class TdetailTypeHistoryComponent {
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
