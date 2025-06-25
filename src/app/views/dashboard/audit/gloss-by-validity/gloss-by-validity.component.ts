import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableGlossValidityComponent } from './table-gloss-validity/table-gloss-validity.component';

@Component({
    selector: 'gloss-by-validity',
    standalone: true,
    imports: [BladePanelComponent, BladeBoxPanelComponent, TableGlossValidityComponent],
    templateUrl: './gloss-by-validity.component.html'
})
export class GlossByValidityComponent {

}
