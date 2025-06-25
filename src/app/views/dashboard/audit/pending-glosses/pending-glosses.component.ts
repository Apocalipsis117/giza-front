import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TablePendingGlossesComponent } from './table-pending-glosses/table-pending-glosses.component';

@Component({
    selector: 'pending-glosses',
    standalone: true,
    imports: [BladePanelComponent, BladeBoxPanelComponent, TablePendingGlossesComponent],
    templateUrl: './pending-glosses.component.html'
})
export class PendingGlossesComponent {

}
