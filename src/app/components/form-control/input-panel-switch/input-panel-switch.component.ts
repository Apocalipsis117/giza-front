import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';

@Component({
    selector: 'input-panel-switch',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './input-panel-switch.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelSwitchComponent),
        multi: true
    }]
})
export class InputPanelSwitchComponent implements ControlValueAccessor {
    public setLabel = input<string | null>(null);
    id: string = '';
    currentValue: boolean = false;

    constructor() {
        this.id = generator.uuid('switch')
    }

    writeValue(obj: any): void {
        this.currentValue = obj ? obj : false;
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
        this.currentValue = e.target.checked;
        this.onTouch();
        this.onChange(this.currentValue);
    }
}
