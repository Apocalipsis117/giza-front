import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { TformNewauditDiagnosisComponent } from '../tform-newaudit-diagnosis/tform-newaudit-diagnosis.component';

@Component({
    selector: 'table-newaudit-diagnosis',
    standalone: true,
    imports: [
        BladeTableComponent,
        TformNewauditDiagnosisComponent
    ],
    templateUrl: './table-newaudit-diagnosis.component.html'
})
export class TableNewauditDiagnosisComponent {

}
