import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { DropdownActionsComponent } from '@layouts/shared/dropdown-actions/dropdown-actions.component';

@Component({
    selector: 'table-instructions-to-remiter',
    standalone: true,
    imports: [CommonModule, BladeTableComponent, DropdownActionsComponent],
    templateUrl: './table-instructions-to-remiter.component.html'
})
export class TableInstructionsToRemiterComponent {

}
