import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { TformPendingGlossesComponent } from '../tform-pending-glosses/tform-pending-glosses.component';

@Component({
    selector: 'table-pending-glosses',
    standalone: true,
    imports: [BladeTableComponent, TformPendingGlossesComponent],
    templateUrl: './table-pending-glosses.component.html'
})
export class TablePendingGlossesComponent {

}
