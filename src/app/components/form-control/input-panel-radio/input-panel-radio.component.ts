import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { generator } from '@helpers/index';
import { OptionsForm } from '@interfaces/index';

@Component({
    selector: 'input-panel-radio',
    standalone: true,
    imports: [NgClass],
    templateUrl: './input-panel-radio.component.html'
})
export class InputPanelRadioComponent {
    setOptions = input<OptionsForm[]>([]);
    setCols = input<number>(3);
    setLabel = input<string | null>(null);
    idGroup = generator.uuid('radio');

    gridCols = computed(() => 'grid-cols-' + this.setCols())
}
