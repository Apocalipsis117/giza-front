import { Component, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';

@Component({
    selector: 'input-number',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-number.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputNumberComponent),
        multi: true
    }]
})
export class InputNumberComponent {
    public readonly setIcon = input<string>('');
    public readonly setLabel = input<string>('');
    public readonly setPlaceholder = input<string>('');
    currentValue = signal<number>(NaN);
    id = generator.uuid('input');

    writeValue(obj: any): void {
        const current = obj ? obj : NaN;
        this.currentValue.set(current);
    }
    onChange = (_: any) => {};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    changeValue(value: any) {
        value ? this.currentValue.set(value) : this.currentValue.set(NaN);
        this.change()
    }

    change() {
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
