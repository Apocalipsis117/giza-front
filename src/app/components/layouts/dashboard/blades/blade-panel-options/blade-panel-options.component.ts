import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'blade-panel-options',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './blade-panel-options.component.html'
})
export class BladePanelOptionsComponent {
    public display = input<'grid' | 'flex'>('grid');

    displayx = computed(() => {
        const d = this.display() === 'grid' ? 'd-grid' : 'flex flex-wrap gap-3'
        return d;
    });
}
