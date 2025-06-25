import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { FormGlossDateReceiptComponent } from '../form-gloss-date-receipt/form-gloss-date-receipt.component';

@Component({
    selector: 'table-gloss-date-receipt',
    standalone: true,
    imports: [BladeTableComponent, FormGlossDateReceiptComponent],
    templateUrl: './table-gloss-date-receipt.component.html'
})
export class TableGlossDateReceiptComponent {

}
