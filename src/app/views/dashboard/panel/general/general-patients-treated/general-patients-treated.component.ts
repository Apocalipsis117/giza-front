import { Component } from '@angular/core';
import { CardBasicChartComponent } from '@layouts/dashboard/cards/card-basic-chart/card-basic-chart.component';
import { ChartVerticalBarsComponent } from '@layouts/dashboard/charts/chart-vertical-bars/chart-vertical-bars.component';

@Component({
    selector: 'general-patients-treated',
    standalone: true,
    imports: [
        CardBasicChartComponent,
        ChartVerticalBarsComponent
    ],
    templateUrl: './general-patients-treated.component.html'
})
export class GeneralPatientsTreatedComponent {

}
