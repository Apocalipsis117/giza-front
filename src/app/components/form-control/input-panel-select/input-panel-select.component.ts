import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';
import { OptionsForm, UiSize } from '@interfaces/index';

@Component({
    selector: 'input-panel-select',
    standalone: true,
    imports: [NgClass],
    templateUrl: './input-panel-select.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelSelectComponent),
        multi: true
    }]
})
export class InputPanelSelectComponent implements ControlValueAccessor {
    setOptions = input<OptionsForm[]>([]);
    setLabel = input<string>('');
    setIcon = input<string>('');
    setText = input<string>('');
    setSize = input<UiSize>(null);
    vertical = input<boolean>(false);
    hiddenLoad = input<boolean>(false);
    disabled = input<boolean>(false);
    setPlaceholder = input<string>('');
    id: string;
    currentValue: number | '' = 0;

    verticalContent = computed(() => this.vertical() ? 'grid grid-cols-5 items-center' : '')
    inputSize = computed(() => this.setSize() ? `input-group-${this.setSize()}` : '')
    active = computed(() => this.setOptions().length > 0 || !this.disabled())

    options = computed(() => {
        return [{
            name: 'Seleccionar',
            value: '',
            data: null
        }, ...this.setOptions()];
    });

    constructor() {
        this.id = generator.uuid('input');
    }

    writeValue(obj: any): void {
        this.currentValue = obj ? obj : '';
    }

    onChange = (_: any) => {};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    select(e: any) {
        this.currentValue = e.target.value;
        this.onChange(this.currentValue);
    }

}
