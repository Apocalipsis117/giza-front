import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableUnfiledInvoicesComponent } from "./table-unfiled-invoices/table-unfiled-invoices.component";

@Component({
    selector: 'unfiled-invoices',
    standalone: true,
    templateUrl: './unfiled-invoices.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableUnfiledInvoicesComponent
    ]
})
export class UnfiledInvoicesComponent {

}
