import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'patients-table',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent
    ],
    templateUrl: './patients-table.component.html'
})
export class PatientsTableComponent {

}
