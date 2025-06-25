import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';

@Component({
    selector: 'form-triage-clinic',
    standalone: true,
    templateUrl: './form-triage-clinic.component.html',
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelTimeComponent,
        InputPanelTextareaComponent,
        TitleIconSectionComponent,
        BladeBoxTitleComponent
    ]
})
export class FormTriageClinicComponent {

}
