import { Component } from '@angular/core';
import { CardBasicChartComponent } from '@layouts/dashboard/cards/card-basic-chart/card-basic-chart.component';

@Component({
    selector: 'medical-agenda-stadistic',
    standalone: true,
    imports: [
        CardBasicChartComponent
    ],
    templateUrl: './medical-agenda-stadistic.component.html'
})
export class MedicalAgendaStadisticComponent {
    stadistics: any[] = [
    {
        title: 'Atendidos',
        porcent: 30,
        color: 'green',
        quantity: 12,
        icon: 'icofont-ui-check'
    },
    {
        title: 'Pendientes',
        porcent: 50,
        color: 'orange',
        quantity: 17,
        icon: 'icofont-ui-clock'
    },
    {
        title: 'Cancelados',
        porcent: 72,
        color: 'red',
        quantity: 15,
        icon: 'icofont-ui-close'
    }
    ]
}
