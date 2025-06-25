import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlOptionColor } from '@interfaces/index';

@Component({
    selector: 'input-colors',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-colors.component.html',
    styleUrl: 'input-colors.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputColorsComponent),
        multi: true
    }],
})
export class InputColorsComponent {
    public setLabel = input<string>('');
    public setOptions = input<FormControlOptionColor[]>([]);
    currentValue = signal<string | number>('');
    id = 'radio-uuixxx';

    options = computed(() => this.setOptions().map(option => ({
        ...option,
        check: this.currentValue() === option.value
    })));

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

    check(value: string | number) {
        this.currentValue.set(value);
        this.change();
    }

    change() {
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
