import { Component } from '@angular/core';
import { BladeBoxUiComponent } from '@layouts/dashboard/blades/blade-box-ui/blade-box-ui.component';
import { GeneralChartDoughnutComponent } from './general-chart-doughnut/general-chart-doughnut.component';
import { GeneralPatientsTreatedComponent } from './general-patients-treated/general-patients-treated.component';
import { GeneralWelcomeInfoComponent } from './general-welcome-info/general-welcome-info.component';

@Component({
    selector: 'view-general',
    standalone: true,
    imports: [
        GeneralWelcomeInfoComponent,
        GeneralChartDoughnutComponent,
        GeneralPatientsTreatedComponent,
        BladeBoxUiComponent
    ],
    templateUrl: './general.component.html'
})
export class GeneralComponent {

}
