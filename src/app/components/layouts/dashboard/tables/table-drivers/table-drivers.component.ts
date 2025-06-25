import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { DropdownActionsComponent } from '@layouts/shared/dropdown-actions/dropdown-actions.component';

@Component({
    selector: 'table-drivers',
    standalone: true,
    templateUrl: './table-drivers.component.html',
    imports: [CommonModule, BladeTableComponent, DropdownActionsComponent]
})
export class TableDriversComponent {

}
