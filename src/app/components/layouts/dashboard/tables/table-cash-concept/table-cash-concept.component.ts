import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-cash-concept',
    standalone: true,
    imports: [
        BladeTableComponent
    ],
    templateUrl: './table-cash-concept.component.html'
})
export class TableCashConceptComponent {

}
