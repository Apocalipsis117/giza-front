import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { TformInvoiceSupportComponent } from '../tform-invoice-support/tform-invoice-support.component';

@Component({
    selector: 'table-invoice-support',
    standalone: true,
    imports: [
        BladeTableComponent,
        TformInvoiceSupportComponent
    ],
    templateUrl: './table-invoice-support.component.html'
})
export class TableInvoiceSupportComponent {

}
