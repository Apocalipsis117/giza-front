import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { TableGlossDateReceiptComponent } from './table-gloss-date-receipt/table-gloss-date-receipt.component';

@Component({
    selector: 'gloss-date-receipt',
    standalone: true,
    imports: [BladePanelComponent, BladeBoxPanelComponent, ButtonComponent, TableGlossDateReceiptComponent],
    templateUrl: './gloss-date-receipt.component.html'
})
export class GlossDateReceiptComponent {

}
