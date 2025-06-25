import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';

@Component({
    selector: 'table-material-supplies',
    standalone: true,
    imports: [
        BladeTableComponent
    ],
    templateUrl: './table-material-supplies.component.html'
})
export class TableMaterialSuppliesComponent {

}
