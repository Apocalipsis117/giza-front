import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'table-institutions',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent
    ],
    templateUrl: './table-institutions.component.html'
})
export class TableInstitutionsComponent {

}
