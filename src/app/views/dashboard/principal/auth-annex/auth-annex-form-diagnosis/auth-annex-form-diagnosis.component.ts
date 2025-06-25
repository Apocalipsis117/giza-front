import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'auth-annex-form-diagnosis',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        BladeBoxTitleComponent,
        InputPanelSelectComponent
    ],
    templateUrl: './auth-annex-form-diagnosis.component.html'
})
export class AuthAnnexFormDiagnosisComponent {

}
