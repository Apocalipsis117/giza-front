import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { TableTraceabilityPatientComponent } from "./table-traceability-patient/table-traceability-patient.component";

@Component({
    selector: 'traceability-patient',
    standalone: true,
    templateUrl: './traceability-patient.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        TableTraceabilityPatientComponent
    ]
})
export class TraceabilityPatientComponent {

}
