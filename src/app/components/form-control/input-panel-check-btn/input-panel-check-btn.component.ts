import { Component, computed, input, signal } from '@angular/core';
import { generator } from '@helpers/index';
import { UiSize } from '@interfaces/index';

@Component({
    selector: 'input-panel-check-btn',
    standalone: true,
    templateUrl: './input-panel-check-btn.component.html'
})
export class InputPanelCheckBtnComponent {
    setLabel = input<string>('Check');
    setSize = input<UiSize>(null);
    id = signal<string>('');

    constructor() {
        this.id.set(generator.uuid('btn-check'))
    }

    btnsize = computed(() => {
        return this.setSize() ? `btn-${this.setSize()}` : '';
    })
}
