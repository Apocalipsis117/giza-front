import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';
import { FormControlOption } from '@interfaces/index';

@Component({
    selector: 'input-select-page',
    standalone: true,
    imports: [],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputSelectPageComponent),
        multi: true
    }],
    templateUrl: './input-select-page.component.html'
})
export class InputSelectPageComponent implements ControlValueAccessor {
    options = input<FormControlOption[]>([]);
    currentValue = signal<number>(0);
    visible = false;
    idInput: string;

    constructor() {
        this.idInput = generator.uuid('input-page');
    }

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
    select(value: any) {
        this.currentValue.set(Number(value.target.value));
        this.onChange(this.currentValue());
    }
}
