import { Component } from '@angular/core';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';

@Component({
    selector: 'form-new-referral',
    standalone: true,
    templateUrl: './form-new-referral.component.html',
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        TitleIconSectionComponent
    ]
})
export class FormNewReferralComponent {

}
