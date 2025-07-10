import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator, ngFormHelper } from '@helpers/index';
import { IMaskModule } from 'angular-imask';

@Component({
    selector: 'input-number',
    standalone: true,
    imports: [
        FormsModule,
        IMaskModule
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

    maskValue = computed(() => {
      const v = this.currentValue();
      return isNaN(v) ? '' : v.toString();
    })

    imaskOptions = {
        mask: Number,
        scale: 2,
        signed: false,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: '.',
        mapToRadix: [',']
    }

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
        value ? this.currentValue.set(Number(value)) : this.currentValue.set(NaN);
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
