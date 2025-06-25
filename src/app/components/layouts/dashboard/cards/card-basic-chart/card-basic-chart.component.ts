import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ColorsTailwind } from '@interfaces/index';

@Component({
    selector: 'card-basic-chart',
    standalone: true,
    imports: [NgClass],
    templateUrl: './card-basic-chart.component.html'
})
export class CardBasicChartComponent {
    public setTitle = input<string>('');
    public setCounter = input<number>(0);
    public setIcon = input<string>('');
    public setPorcentage = input<number>(0);
    public setColor = input<ColorsTailwind>('default');
    theme = computed(() => `theme-` + this.setColor());

    bgColor = computed(() => {
        return `bg-${this.setColor()}-100`;
    });

    textColor = computed(() => {
        return `text-${this.setColor()}-700`;
    });

    barColor = computed(() => {
        return `bg-${this.setColor()}-500`;
    });
}
