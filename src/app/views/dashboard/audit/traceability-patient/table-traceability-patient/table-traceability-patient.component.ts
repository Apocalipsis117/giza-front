import { Component } from '@angular/core';
import { TformTraceabilityPatientComponent } from "../tform-traceability-patient/tform-traceability-patient.component";
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { InputCheckTableComponent } from '@form-control/input-check-table/input-check-table.component';

@Component({
    selector: 'table-traceability-patient',
    standalone: true,
    templateUrl: './table-traceability-patient.component.html',
    imports: [
        TformTraceabilityPatientComponent,
        BladeTableComponent,
        InputCheckTableComponent
    ]
})
export class TableTraceabilityPatientComponent {

}
