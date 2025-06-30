import { Component, computed, input, output } from '@angular/core';
import { CostCenter_PageAPP } from '@interfaces/index';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { BadgeStatusComponent } from '@layouts/shared/badge-status/badge-status.component';

@Component({
    selector: 'table-cost-center',
    standalone: true,
    imports: [
        BladeTableComponent,
        BadgeStatusComponent
    ],
    templateUrl: './table-cost-center.component.html'
})
export class TableCostCenterComponent {
    paginate = output<any>();
    data = input<CostCenter_PageAPP | null>(null);

    list = computed(() => this.data() ? this.data()!.content : []);
}
