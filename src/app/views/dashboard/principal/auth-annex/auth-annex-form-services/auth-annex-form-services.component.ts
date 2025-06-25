import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'auth-annex-form-services',
    standalone: true,
    imports: [
        BladeTableComponent,
        ButtonComponent,
        BladeBoxTitleComponent,
        InputPanelSelectComponent,
        InputPanelTextComponent,
        InputPanelTextareaComponent
    ],
    templateUrl: './auth-annex-form-services.component.html'
})
export class AuthAnnexFormServicesComponent {

}
