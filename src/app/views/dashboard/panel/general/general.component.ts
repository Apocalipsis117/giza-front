import { Component } from '@angular/core';
import { GeneralWelcomeInfoComponent } from './general-welcome-info/general-welcome-info.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeTabsPanelsComponent } from '@layouts/dashboard/blades/blade-tabs-panels/blade-tabs-panels.component';
import { GeneralChartDoughnutComponent } from './general-chart-doughnut/general-chart-doughnut.component';
import { GeneralPatientsTreatedComponent } from './general-patients-treated/general-patients-treated.component';
import { BladeBoxUiComponent } from '@layouts/dashboard/blades/blade-box-ui/blade-box-ui.component';

@Component({
    selector: 'view-general',
    standalone: true,
    imports: [
        BladePanelComponent,
        BladeTabsPanelsComponent,
        GeneralWelcomeInfoComponent,
        GeneralChartDoughnutComponent,
        GeneralPatientsTreatedComponent,
        BladeBoxUiComponent
    ],
    templateUrl: './general.component.html'
})
export class GeneralComponent {

}
