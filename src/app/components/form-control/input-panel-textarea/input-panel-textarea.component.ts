import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generator } from '@helpers/index';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'input-panel-textarea',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './input-panel-textarea.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelTextareaComponent),
        multi: true
    }]
})
export class InputPanelTextareaComponent implements ControlValueAccessor {
    @Input() setLabel: string = '';
    @Input() setType: 'number' | 'text' | 'email' | 'tel' | 'date' | 'datetime' = 'text';
    @Input() setPlaceholder: string = '';
    @Input() setIcon: string = '';
    @Input() setRow: number = 3;
    @Input() vertical: boolean = false;
    currentValue: string = '';
    id: string = '';

    constructor() {
        this.id = generator.uuid('textarea')
    }

    get verticalContent() {
        return this.vertical ? 'grid grid-cols-5 items-center' : '';
    }

    writeValue(obj: any): void {
        this.currentValue = obj ? obj : '';
    }
    onChange = (_: any) => {};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    changeInput() {
        this.onTouch();
        this.onChange(this.currentValue);
    }
}
