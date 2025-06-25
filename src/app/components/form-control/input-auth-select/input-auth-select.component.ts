import { Component, forwardRef, HostListener, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OptionsForm } from '@interfaces/index';

@Component({
    selector: 'input-auth-select',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './input-auth-select.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputAuthSelectComponent),
        multi: true
    }]
})
export class InputAuthSelectComponent implements ControlValueAccessor {
    options = input<OptionsForm[]>([]);
    inputLabel = input<string>('');
    currentValue = signal<number | ''>('');
    idInput = signal<string>('');
    visible = signal<boolean>(false);

    constructor() {
        this.idInput.set('id-input-default');
    }

    @HostListener('window:click', ['$event.target']) click(e: any): void {
        const visible = e.closest('#' + this.idInput()) ? !this.visible() : false;
        this.visible.set(visible);
    }
    writeValue(obj: any): void {
        this.currentValue = obj ? obj : '';
    }
    onChange = (_:any)=>{};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onTouch = () => {};
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    select(value: OptionsForm){
        this.currentValue.set(Number(value.value));
        this.onChange(this.currentValue);
    }

    get valueInput(){
        if(this.options().length > 0){
            const option = this.options().find(option => option.value === this.currentValue());
            return option ? option.name : 'Seleccionar';
        } else {
            return 'Vacio'
        }
    }
}
