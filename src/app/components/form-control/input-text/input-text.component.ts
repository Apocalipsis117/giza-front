import { Component, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    setLabel = input<string>('');
    setPlaceholder = input<string>('');
    setType = input<string>('text');
    currentValue = signal<string | number>('');
    id = "uuid-xxx";

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
    change() {
        const value = this.setType() === 'number' ? Number(this.currentValue()) : this.currentValue();
        this.currentValue.set(value);
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
