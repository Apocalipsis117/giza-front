import { Component, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';

@Component({
  selector: 'input-onoff',
  standalone: true,
  imports: [],
  templateUrl: './input-onoff.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputOnoffComponent),
        multi: true
    }],
})
export class InputOnoffComponent {
    public readonly ui = input<'checkbox' | 'radio' | 'switch'>('checkbox');
    public setLabel = input<string>('');
    public setText = input<string>('');
    currentValue = signal<boolean>(false);
    id = generator.uuid('input');


    writeValue(obj: any): void {
        this.currentValue.set(obj || false);
    }
    onChange = (_: any) => {};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    check(event: any) {
        this.currentValue.set(event.checked);
        this.change()
    }

    change() {
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
