import { Component } from '@angular/core';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { PanelPatientsEmergencyComponent } from './panel-patients-emergency/panel-patients-emergency.component';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { TablePatientsEmergencyComponent } from './table-patients-emergency/table-patients-emergency.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { PanelPatientProfileComponent } from '@layouts/dashboard/panels/panel-patient-profile/panel-patient-profile.component';

@Component({
    selector: 'patients-emergency',
    standalone: true,
    templateUrl: './patients-emergency.component.html',
    imports: [
        BladePanelComponent,
        PanelPatientsEmergencyComponent,
        TitleIconSectionComponent,
        TablePatientsEmergencyComponent,
        BladeBoxPanelComponent,
        PanelPatientProfileComponent
    ]
})
export class PatientsEmergencyComponent {

}
