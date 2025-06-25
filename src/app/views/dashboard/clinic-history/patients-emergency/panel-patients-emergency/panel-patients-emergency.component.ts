import { Component } from '@angular/core';
import { CardBasicChartComponent } from '@layouts/dashboard/cards/card-basic-chart/card-basic-chart.component';

@Component({
    selector: 'panel-patients-emergency',
    standalone: true,
    templateUrl: './panel-patients-emergency.component.html',
    imports: [
        CardBasicChartComponent
    ]
})
export class PanelPatientsEmergencyComponent {
}
