import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { generator } from '@helpers/index';
import { InputType, UiSize } from '@interfaces/index';
import { IMaskModule } from 'angular-imask';

@Component({
    selector: 'input-panel-text',
    standalone: true,
    imports: [NgClass, FormsModule, IMaskModule],
    templateUrl: './input-panel-text.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelTextComponent),
        multi: true
    }]
})
export class InputPanelTextComponent implements ControlValueAccessor {
    public setSize = input<UiSize>(null);
    public setLabel = input<string>('');
    public setText = input<string>('');
    public setPlaceholder = input<string>('');
    public setIcon = input<string>('');
    public setType = input<InputType>('text');
    public vertical = input<boolean>(false);
    public load = input<boolean>(false);
    public readOnly = input<boolean>(false);
    public disabled = input<boolean>(false);
    currentValue = signal<string>('');
    id = generator.uuid('input');


    verticalContent = computed(() => this.vertical() ? 'grid grid-cols-5 items-center' : '')
    inputSize = computed(() => this.setSize() ? `input-group-${this.setSize()}` : '')
    uiReadOnly = computed(() => this.readOnly() ? 'input-group-readonly' : '')

    writeValue(obj: any): void {
        this.currentValue.set(obj || '');
    }
    onChange = (_: any) => {};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    changeInput(e: any) {
        const value = this.setType() === 'number' ? Number(e) : e;
        this.currentValue.set(value);
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
