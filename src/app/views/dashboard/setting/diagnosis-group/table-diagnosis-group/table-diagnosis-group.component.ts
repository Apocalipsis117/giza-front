import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-diagnosis-group',
    standalone: true,
    imports: [BladeTableComponent],
    templateUrl: './table-diagnosis-group.component.html'
})
export class TableDiagnosisGroupComponent {

}
