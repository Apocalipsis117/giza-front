import { Component, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator, ngFormHelper } from '@helpers/index';

@Component({
    selector: 'input-text',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-text.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputTextComponent),
        multi: true
    }]
})
export class InputTextComponent {
    public setValidate = input<AbstractControl | null>(null);
    public readonly setIcon = input<string>('');
    public readonly setLabel = input<string>('');
    public readonly setPlaceholder = input<string>('');
    public readonly setType = input<string>('text');
    currentValue = signal<string | number>('');
    id = generator.uuid('input');
    error = signal<string | null>(null);

    validate() {
        ngFormHelper.validate(this.setValidate(), this.error);
    }

    writeValue(obj: any): void {
        this.currentValue.set(obj || '');
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
    change() {
        const value = this.setType() === 'number' ? Number(this.currentValue()) : this.currentValue();
        this.currentValue.set(value);
        this.onChange(this.currentValue());
        this.validate();
    }

    blur() {
        this.onTouch();
        this.validate();
    }
}
