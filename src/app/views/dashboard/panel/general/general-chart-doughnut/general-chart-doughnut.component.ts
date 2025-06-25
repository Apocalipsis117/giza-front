import { Component } from '@angular/core';
import { ChartDoughnutComponent } from '@layouts/dashboard/charts/chart-doughnut/chart-doughnut.component';

@Component({
    selector: 'general-chart-doughnut',
    standalone: true,
    imports: [
        ChartDoughnutComponent
    ],
    templateUrl: './general-chart-doughnut.component.html'
})
export class GeneralChartDoughnutComponent {

}
