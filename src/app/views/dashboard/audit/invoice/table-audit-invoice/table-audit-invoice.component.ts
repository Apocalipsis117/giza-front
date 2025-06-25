import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { FormTableInvoiceComponent } from '../form-table-invoice/form-table-invoice.component';

@Component({
    selector: 'table-audit-invoice',
    standalone: true,
    imports: [BladeTableComponent, FormTableInvoiceComponent],
    templateUrl: './table-audit-invoice.component.html'
})
export class TableAuditInvoiceComponent {

}
