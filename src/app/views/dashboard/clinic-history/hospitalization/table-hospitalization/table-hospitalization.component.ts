import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { TformHospitalizationComponent } from "../tform-hospitalization/tform-hospitalization.component";

@Component({
    selector: 'table-hospitalization',
    standalone: true,
    templateUrl: './table-hospitalization.component.html',
    imports: [
        BladeTableComponent,
        TformHospitalizationComponent
    ]
})
export class TableHospitalizationComponent {

}
