import { Component } from '@angular/core';
import { FormAdmissionsControlComponent } from '../form-admissions-control/form-admissions-control.component';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-admissions-control',
    standalone: true,
    imports: [FormAdmissionsControlComponent, BladeTableComponent],
    templateUrl: './table-admissions-control.component.html'
})
export class TableAdmissionsControlComponent {

}
