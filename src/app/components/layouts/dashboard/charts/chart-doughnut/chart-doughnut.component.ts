import { Component, ElementRef, PLATFORM_ID, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { timer } from 'rxjs';

@Component({
    selector: 'chart-doughnut',
    standalone: true,
    imports: [],
    template: '<canvas class="w-full" #canvasRef>{{ chart() }}</canvas>'
})
export class ChartDoughnutComponent {
    private readonly platform = inject(PLATFORM_ID);
    canvasRef = viewChild<ElementRef>('canvasRef');
    chart = signal<any>(null);

    constructor() {
        afterNextRender(() => {
            if (this.platform) {
                timer(0).subscribe(() => this.chartInit())
            }
        });
    }

    chartInit() {
        const chart = new Chart(this.canvasRef()?.nativeElement, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [30, 15, 44],
                    backgroundColor: ['#d9f99d', '#fdba74', '#fca5a5'],
                    borderWidth: 1
                }]
            }
        });
        this.chart.set(chart);
    }
}
