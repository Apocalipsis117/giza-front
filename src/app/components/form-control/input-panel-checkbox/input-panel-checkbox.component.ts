import { Component, computed, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';

/**
 * @output eventCheck:
 * ---
 * devuleve el value el cual puede ser un valor custos exclusivo del input
 * ```ts
 * interface output {
 *   type: string;
 *   data: Data;
 * };
 *
 * interface Data {
 *   check: bool;
 *   value: any
 * }
 * ```
 * @input setLabel : label
 * @input value : valor por defecto
 * @input clean : ui white
 */
@Component({
    selector: 'input-panel-checkbox',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './input-panel-checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelCheckboxComponent),
        multi: true
    }]
})
export class InputPanelCheckboxComponent implements ControlValueAccessor {
    eventCheck = output<{ type: string; data: any }>();
    setLabel = input<string>('');
    value = input<number | string>();
    clean = input<boolean>(false);
    setSize = input<'sm' | 'lg' | ''>('');
    setText = input<string>('');
    typeCheck = input<'switch' | ''>('');
    currentValue = signal<boolean | null>(null);
    id = generator.uuid('check');

    inputSize = computed(() => this.setSize() ? `input-group-${this.setSize()}` : '')

    isClean = computed(() => this.clean() ? 'input-check-clean' : '')

    uiCheckbox = computed(() => this.typeCheck() === 'switch' ? 'form-switch' : '')

    writeValue(obj: boolean): void {
        this.currentValue.set(obj || null);
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
        this.emit(e);
        this.onTouch();
        this.onChange(this.currentValue());
    }

    emit(e: boolean) {
        this.eventCheck.emit({
            type: 'value',
            data: {
                check: e,
                value: this.value()
            }
        })
    }
}
