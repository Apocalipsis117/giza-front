import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dateFormate, generator } from '@helpers/index';
import { InputDate, UiSize } from '@interfaces/index';

@Component({
    selector: 'input-panel-time',
    standalone: true,
    imports: [FormsModule, NgClass],
    templateUrl: './input-panel-time.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelTimeComponent),
        multi: true
    }]
})
export class InputPanelTimeComponent implements ControlValueAccessor {
    public setType = input<InputDate>('date');
    public vertical = input<boolean>(false);
    public load = input<boolean>(false);
    public readOnly = input<boolean>(false);
    public setSize = input<UiSize | null>(null);
    public setLabel = input<string>('');
    public setText = input<string>('');
    public setPlaceholder = input<string>('');
    public setIcon = input<string>('');
    currentValue = signal<string>('');
    id: string = generator.uuid('input');

    verticalContent = computed(() => this.vertical() ? 'grid grid-cols-5 items-center' : '')
    uiReadOnly = computed(() => this.readOnly() ? 'input-group-readonly' : '')
    inputSize = computed(() => this.setSize() ? `input-group-${this.setSize()}` : '')

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
    changeInput() {
        this.onTouch();
        this.onChange(this.currentValue());
    }

    setTimeNow() {
        const timeNow = new Date();
        let time: string;
        if (this.setType() === 'datetime-local') {
            time = dateFormate.getDatetime(timeNow).fomatDatetime;
        }
        else if (this.setType() === 'time') {
            time = dateFormate.getDatetime(timeNow).fomatTime;
        }
        else {
            time = dateFormate.getDatetime(timeNow).fomatDate;
        }
        this.currentValue.set(time);
        this.changeInput()
    }
}
