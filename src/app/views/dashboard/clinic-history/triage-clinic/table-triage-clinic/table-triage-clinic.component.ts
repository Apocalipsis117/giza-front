import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'table-triage-clinic',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent
    ],
    templateUrl: './table-triage-clinic.component.html'
})
export class TableTriageClinicComponent {

}
