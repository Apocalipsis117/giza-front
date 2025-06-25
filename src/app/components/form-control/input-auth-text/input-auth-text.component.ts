import { Component, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-auth-text',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './input-auth-text.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputAuthTextComponent),
        multi: true
    }]
})
export class InputAuthTextComponent {
    inputLabel = input<string>('');
    inputType = input<string>('');
    currentValue = signal<string>('');

    writeValue(obj: any): void {
        this.currentValue.set( obj || '');
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
        this.currentValue.set(e);
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
