import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { TformNewauditSupportComponent } from '../tform-newaudit-support/tform-newaudit-support.component';

@Component({
    selector: 'table-newaudit-support',
    standalone: true,
    imports: [
        BladeTableComponent,
        TformNewauditSupportComponent
    ],
    templateUrl: './table-newaudit-support.component.html'
})
export class TableNewauditSupportComponent {

}
