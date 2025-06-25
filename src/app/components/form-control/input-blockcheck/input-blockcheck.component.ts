import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generator } from '@helpers/index';

@Component({
    selector: 'input-blockcheck',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-blockcheck.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputBlockcheckComponent),
        multi: true
    }]
})
export class InputBlockcheckComponent {
    public setLabel = input.required<string>();
    id: string = '';
    currentValue: boolean = false;

    constructor() {
        this.id = generator.uuid('switch');
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
