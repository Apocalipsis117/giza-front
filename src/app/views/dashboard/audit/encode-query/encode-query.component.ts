import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableEncodeQueryComponent } from './table-encode-query/table-encode-query.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'encode-query',
    standalone: true,
    imports: [BladePanelComponent, BladeBoxPanelComponent, TableEncodeQueryComponent, ButtonComponent],
    templateUrl: './encode-query.component.html'
})
export class EncodeQueryComponent {

}
