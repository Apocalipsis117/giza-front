import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormDiagnosisGroupComponent } from './form-diagnosis-group/form-diagnosis-group.component';
import { TableDiagnosisGroupComponent } from './table-diagnosis-group/table-diagnosis-group.component';

@Component({
    selector: 'diagnostic-group',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormDiagnosisGroupComponent,
        TableDiagnosisGroupComponent
    ],
    templateUrl: './diagnosis-group.component.html'
})
export class DiagnosisGroupComponent {

}
