import { Component } from '@angular/core';
import { CardBasicChartComponent } from '@layouts/dashboard/cards/card-basic-chart/card-basic-chart.component';

@Component({
    selector: 'survey-statistics',
    standalone: true,
    imports: [
        CardBasicChartComponent
    ],
    templateUrl: './survey-statistics.component.html'
})
export class SurveyStatisticsComponent {

}
