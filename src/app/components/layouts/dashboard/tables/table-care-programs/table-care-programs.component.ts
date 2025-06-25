import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-care-programs',
    standalone: true,
    imports: [BladeTableComponent],
    templateUrl: './table-care-programs.component.html'
})
export class TableCareProgramsComponent {

}
