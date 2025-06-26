import { Component, computed, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';

@Component({
    selector: 'input-checkbox',
    standalone: true,
    imports: [],
    templateUrl: './input-checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputCheckboxComponent,
            multi: true,
        },
    ],
})
export class InputCheckboxComponent {
    public readonly setLabel = input<string>('');
    public readonly setText = input<string>('Activar');
    public readonly setValue = input<string | number>('');
    public readonly setName = input<string>('');
    public readonly ui = input<'checkbox' | 'radio' | 'switch'>('checkbox');
    currentValue = signal<string | number>('');
    id = generator.uuid('input');

    isCheck = computed(() => this.currentValue() === this.setValue())
    name = computed(() => this.setName() ? this.setName() : this.id)

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

    onCheckboxChange(event: any): void {
        this.currentValue.set('')
        if(event.checked) {
            this.currentValue.set(event.value)
        }
        this.onChange(this.currentValue());
        this.onTouch();
    }
}
