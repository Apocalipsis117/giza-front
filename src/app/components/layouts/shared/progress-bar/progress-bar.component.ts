import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'progress-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent {
    public porcentLoad = input<number>(0);

    load = computed(() => `${this.porcentLoad()}%`)
}
