import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { generator } from '@helpers/index';

@Component({
    selector: 'input-panel-checkinline',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './input-panel-checkinline.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputPanelCheckinlineComponent),
        multi: true
    }]
})
export class InputPanelCheckinlineComponent implements ControlValueAccessor {
    setLabel = input<string>('');
    changeColor = input<boolean>(false);
    changeText = input<boolean>(false);
    small = input<boolean>(false);
    currentValue = signal<boolean>(false);
    id = generator.uuid('checkinline');

    label = computed(() => this.changeText() ? this.changeStatus : this.setLabel())
    changeStatus = computed(() => this.currentValue() ? 'Activo' : 'Inactivo')
    changeColorActive = computed(() => this.changeColor() ? this.colorActive : '')
    colorActive = computed(() => this.currentValue() ? 'text-green-500' : 'text-red-500')
    textSize = computed(() => this.small() ? 'text-sm' : '')

    writeValue(obj: any): void {
        this.currentValue.set(obj || false);
    }
    onChange = (_:any)=>{};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    changeInput(e: any){
        this.currentValue.set(e);
        this.onTouch();
        this.onChange(this.currentValue());
    }

}
