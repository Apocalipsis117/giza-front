import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-transfer-fee',
    standalone: true,
    imports: [
        BladeTableComponent
    ],
    templateUrl: './table-transfer-fee.component.html'
})
export class TableTransferFeeComponent {

}
