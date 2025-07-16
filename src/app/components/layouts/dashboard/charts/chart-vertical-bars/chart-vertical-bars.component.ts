import { Component, ElementRef, PLATFORM_ID, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { timer } from 'rxjs';

@Component({
    selector: 'chart-vertical-bars',
    standalone: true,
    imports: [],
    template: '<canvas #canvasRef class="w-full">{{ chart() }}</canvas>'
})
export class ChartVerticalBarsComponent {
    private readonly platform = inject(PLATFORM_ID);
    canvasRef = viewChild<ElementRef>('canvasRef');
    chart = signal<any>(null);

    constructor() {
        afterNextRender(() => {
            if(this.platform) {
                timer(0).subscribe(() => this.chartInit())
            }
        })
    }

    chartInit(): void {
        const chart = new Chart(this.canvasRef()?.nativeElement, {
            type: 'bar',
            data: {
                labels: ['23 nov', '24 nov', '25 nov', '26 nov', '27 nov', '28 nov'],
                datasets: [{
                    label: 'Pacientes atendidos',
                    data: [30, 15, 44, 17, 25, 32],
                    backgroundColor: ['#a78bfa'],
                    borderWidth: 1
                }, {
                    label: 'Tratamientos actuales',
                    data: [5, 6, 30, 15, 15, 28],
                    backgroundColor: ['#2dd4bf'],
                    borderWidth: 1
                }, {
                    label: 'Dados de alta',
                    data: [25, 8, 14, 22, 10, 20],
                    backgroundColor: ['#4ade80'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        this.chart.set(chart)
    }
}
