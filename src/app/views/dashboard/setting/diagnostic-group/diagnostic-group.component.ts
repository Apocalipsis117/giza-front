import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormDiagnosticGroupComponent } from './form-diagnostic-group/form-diagnostic-group.component';
import { TableDiagnosticGroupComponent } from './table-diagnostic-group/table-diagnostic-group.component';

@Component({
    selector: 'diagnostic-group',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormDiagnosticGroupComponent,
        TableDiagnosticGroupComponent
    ],
    templateUrl: './diagnostic-group.component.html'
})
export class DiagnosticGroupComponent {

}
