import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';
import { UiSize } from '@interfaces/index';

@Component({
    selector: 'input-panel-number',
    standalone: true,
    imports: [FormsModule, NgClass],
    templateUrl: './input-panel-number.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelNumberComponent),
        multi: true
    }]
})
export class InputPanelNumberComponent implements ControlValueAccessor {
    @ViewChild('inputNumber') inputNumber!: ElementRef;
    setSize = input<UiSize | null>(null);
    setLabel = input<string>('');
    isDisabled = input<boolean>(false);
    readOnly = input<boolean>(false);
    setMax = input<number | undefined>(undefined);
    setMin = input<number | undefined>(-5);
    setIcon = input<string>('');
    id = generator.uuid('input-number');

    currentValue = signal<number>(0);
    onChange = (_: any) => {};
    onTouch = () => {};

    inputSize = computed(() => this.setSize() ? `input-group-${this.setSize()}` : '');

    writeValue(value: number): void {
        if (value) {
            this.currentValue.set(value);
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    changeValue(value: any) {
        const numericValue = Number(value);
        this.currentValue.set(this.clampValue(numericValue));
        this.onTouch();
        this.onChange(this.currentValue());
    }

    incr() {
        this.currentValue.update(value => this.clampValue(value + 1));
        this.onTouch();
        this.onChange(this.currentValue());
    }

    decr() {
        this.currentValue.update(value => this.clampValue(value - 1));
        this.onTouch();
        this.onChange(this.currentValue());
    }

   clampValue(value: number): number {
        let clampedValue = value;
        if (this.setMax() !== undefined && clampedValue > this.setMax()!) {
            clampedValue = this.setMax()!;
            this.innerValue(clampedValue);
        }
        if (this.setMin() !== undefined && clampedValue < this.setMin()!) {
            clampedValue = this.setMin()!;
            this.innerValue(clampedValue);
        }
        return clampedValue;
    }

    innerValue(value: number) {
        this.inputNumber.nativeElement.value = value;
    }
}
