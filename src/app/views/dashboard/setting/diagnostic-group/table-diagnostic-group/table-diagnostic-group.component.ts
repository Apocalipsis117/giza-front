import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-diagnostic-group',
    standalone: true,
    imports: [BladeTableComponent],
    templateUrl: './table-diagnostic-group.component.html'
})
export class TableDiagnosticGroupComponent {

}
