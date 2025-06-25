import { Component, computed, input } from '@angular/core';
import { RIPConceptAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'table-ripconcept',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent
    ],
    templateUrl: './table-ripconcept.component.html'
})
export class TableRipconceptComponent {
    dataTable = input<RIPConceptAPP[]>([]);

    load = computed(() => this.dataTable().length > 0);
}
