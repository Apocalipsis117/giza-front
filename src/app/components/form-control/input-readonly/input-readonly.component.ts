import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { InputType, UiSize } from '@interfaces/index';

@Component({
    selector: 'input-readonly',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './input-readonly.component.html'
})
export class InputReadonlyComponent {
    public setSize = input<UiSize>(null);
    public setLabel = input<string>('');
    public setValue = input<string>('');
    public setIcon = input<string>('');
    public setText = input<string>('');
    public setType = input<InputType>('text');
    public load = input<boolean>(false);
    public setPlaceholder = input<string>('');

    inputSize = computed(() => this.setSize() ? `input-group-${this.setSize()}` : '')
}
