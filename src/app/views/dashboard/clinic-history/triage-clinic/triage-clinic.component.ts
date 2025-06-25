import { Component } from '@angular/core';
import { DirectivesModule } from '@directive/module';
import { tabsControls } from '@interfaces/index';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { PanelPatientProfileComponent } from '@layouts/dashboard/panels/panel-patient-profile/panel-patient-profile.component';
import { FormTriageClinicComponent } from "./form-triage-clinic/form-triage-clinic.component";
import { TableTriageClinicComponent } from "./table-triage-clinic/table-triage-clinic.component";

@Component({
    selector: 'triage-clinic',
    standalone: true,
    templateUrl: './triage-clinic.component.html',
    imports: [
        BladePanelComponent,
        BladeTabsHorizontalComponent,
        DirectivesModule,
        TableTriageClinicComponent,
        FormTriageClinicComponent,
        PanelPatientProfileComponent
    ]
})
export class TriageClinicComponent {
    tabs: tabsControls[] = [
        {
            active: true,
            idConnect: 'triage-patient',
            label: 'Pacientes'
        },
        {
            active: false,
            idConnect: 'triage-form',
            label: 'Nuevo triage'
        }
    ];
}
