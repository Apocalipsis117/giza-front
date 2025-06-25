import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-priority-queries',
    standalone: true,
    imports: [
        BladeTableComponent
    ],
    templateUrl: './table-priority-queries.component.html'
})
export class TablePriorityQueriesComponent {

}
