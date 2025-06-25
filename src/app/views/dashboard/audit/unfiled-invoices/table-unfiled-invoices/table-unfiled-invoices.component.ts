import { Component } from '@angular/core';
import { InputCheckTableComponent } from '@form-control/input-check-table/input-check-table.component';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { TformUnfiledInvoicesComponent } from "../tform-unfiled-invoices/tform-unfiled-invoices.component";

@Component({
    selector: 'table-unfiled-invoices',
    standalone: true,
    templateUrl: './table-unfiled-invoices.component.html',
    imports: [
        BladeTableComponent,
        TformUnfiledInvoicesComponent,
        InputCheckTableComponent
    ]
})
export class TableUnfiledInvoicesComponent {

}
