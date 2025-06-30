import { Component, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'input-textarea',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-textarea.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputTextareaComponent),
        multi: true
    }]
})
export class InputTextareaComponent {
    public readonly setIcon = input<string>('');
    setLabel = input<string>('');
    setRow = input<number>(4);
    setPlaceholder = input<string>('');
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
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
