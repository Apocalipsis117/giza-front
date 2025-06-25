import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { ListSearchComponent } from '@layouts/dashboard/lists/list-search/list-search.component';
import { TableInvoiceSupportComponent } from './table-invoice-support/table-invoice-support.component';

@Component({
    selector: 'invoice-support',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableInvoiceSupportComponent,
        ListSearchComponent
    ],
    templateUrl: './invoice-support.component.html'
})
export class InvoiceSupportComponent {

}
