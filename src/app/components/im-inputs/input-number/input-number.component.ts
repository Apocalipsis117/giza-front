import { Component, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator, ngFormHelper } from '@helpers/index';

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
    public setValidate = input<AbstractControl | null>(null);
    public readonly setIcon = input<string>('');
    public readonly setLabel = input<string>('');
    public readonly setPlaceholder = input<string>('');
    currentValue = signal<number>(NaN);
    id = generator.uuid('input');
    error = signal<string | null>(null);

    validate() {
        ngFormHelper.validate(this.setValidate(), this.error);
    }

    writeValue(obj: any): void {
        const current = obj ? obj : NaN;
        this.currentValue.set(current);
        this.error.set(null);
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
        console.log("value", value);
        value ? this.currentValue.set(value) : this.currentValue.set(NaN);
        this.change()
    }

    change() {
        this.onChange(this.currentValue());
        this.validate();
    }

    blur() {
        this.onTouch();
        this.validate();
    }
}
