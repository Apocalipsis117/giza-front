import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'auth-annex-form-materials',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        BladeBoxTitleComponent,
        InputPanelSelectComponent,
        InputPanelTextComponent
    ],
    templateUrl: './auth-annex-form-materials.component.html'
})
export class AuthAnnexFormMaterialsComponent {

}
