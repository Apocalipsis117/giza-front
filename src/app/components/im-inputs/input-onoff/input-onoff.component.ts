import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';

@Component({
    selector: 'input-onoff',
    standalone: true,
    templateUrl: './input-onoff.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputOnoffComponent),
        multi: true
    }],
    styles: 'label.active { color: #43CB79 }'
})
export class InputOnoffComponent {
    public readonly ui = input<'checkbox' | 'radio' | 'switch'>('checkbox');
    public readonly boxUi = input<'unborder' | null>(null);
    public setLabel = input<string>('');
    public isDisabled = input<boolean>(false);
    public setText = input<string | [string, string]>('');
    currentValue = signal<boolean>(false);
    id = generator.uuid('input');

    box = computed(() => this.boxUi() ? `ui-${this.boxUi()}` : '');

    text = computed(() => {
        const value = this.setText();
        let response = {
            text: '',
            cssActive: ''
        }
        if (value === '') {
            return response;
        }
        else if (typeof value === 'string') {
            response.text = value;
            return response;
        }
        else if (Array.isArray(value) && value.length === 2) {
            response = this.currentValue() ? { text: value[1], cssActive: 'active' } : { text: value[0], cssActive: '' };
            return response;
        }
        return response;
    });

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
        this.change();
    }

    change() {
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
