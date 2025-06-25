import { Component } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { TformPhysicalTherapyComponent } from "../tform-physical-therapy/tform-physical-therapy.component";

@Component({
    selector: 'table-physical-therapy',
    standalone: true,
    templateUrl: './table-physical-therapy.component.html',
    imports: [
        BladeTableComponent,
        TformPhysicalTherapyComponent
    ]
})
export class TablePhysicalTherapyComponent {

}
