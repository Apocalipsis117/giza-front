import { Component } from '@angular/core';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { IncivilityAnnexIncorrectComponent } from './incivility-annex-incorrect/incivility-annex-incorrect.component';
import { BladeBoxUiComponent } from '@layouts/dashboard/blades/blade-box-ui/blade-box-ui.component';
import { BladeBoxTitleComponent } from '@layouts/dashboard/blades/blade-box-title/blade-box-title.component';
import { IncivilityAnnexDocumentComponent } from './incivility-annex-document/incivility-annex-document.component';
import { CardPatientDataComponent } from '@layouts/dashboard/cards/card-patient-data/card-patient-data.component';
import { IncivilityAnnexFormInsideComponent } from './incivility-annex-form-inside/incivility-annex-form-inside.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'incivility-annex',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        IncivilityAnnexIncorrectComponent,
        BladeBoxUiComponent,
        BladeBoxTitleComponent,
        IncivilityAnnexDocumentComponent,
        CardPatientDataComponent,
        IncivilityAnnexFormInsideComponent,
        InputPanelTextComponent,
        ButtonComponent
    ],
    templateUrl: './incivility-annex.component.html'
})
export class IncivilityAnnexComponent {

}
