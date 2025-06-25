import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { FormHospitalizationComponent } from "./form-hospitalization/form-hospitalization.component";
import { TableHospitalizationComponent } from "./table-hospitalization/table-hospitalization.component";

@Component({
    selector: 'app-hospitalization',
    standalone: true,
    templateUrl: './hospitalization.component.html',
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        FormHospitalizationComponent,
        TableHospitalizationComponent
    ]
})
export class HospitalizationComponent {

}
