import { Component, inject } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableAuditInvoiceComponent } from './table-audit-invoice/table-audit-invoice.component';

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [BladePanelComponent, BladeBoxPanelComponent, TableAuditInvoiceComponent],
    templateUrl: './invoice.component.html'
})
export class InvoiceComponent {

}
