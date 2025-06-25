import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { DropdownActionsComponent } from '@layouts/shared/dropdown-actions/dropdown-actions.component';

@Component({
    selector: 'table-cups-group',
    standalone: true,
    imports: [BladeTableComponent, DropdownActionsComponent],
    templateUrl: './table-cups-group.component.html'
})
export class TableCupsGroupComponent {

}
