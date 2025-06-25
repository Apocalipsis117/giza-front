import { Component } from '@angular/core';
import { InputPanelSelectDoctorComponent } from '@form-control/input-panel-select-doctor/input-panel-select-doctor.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';

@Component({
    selector: 'form-personal-injuries',
    standalone: true,
    templateUrl: './form-personal-injuries.component.html',
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelTimeComponent,
        InputPanelSelectDoctorComponent,
        BladeBoxTitleComponent,
        InputPanelTextareaComponent,
        ButtonComponent,
        TitleIconSectionComponent
    ]
})
export class FormPersonalInjuriesComponent {

}
