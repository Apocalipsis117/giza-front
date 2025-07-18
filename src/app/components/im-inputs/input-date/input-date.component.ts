import { Component, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateHelper, generator } from '@helpers/index';
import { InputDate } from '@interfaces/index';

@Component({
    selector: 'input-date',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-date.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputDateComponent),
        multi: true
    }]
})
export class InputDateComponent {
    public setType = input<InputDate>('date');
    public setLabel = input<string>('');
    public setIcon = input<string>('');
    currentValue = signal<string>('');
    id: string = generator.uuid('date');

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
    changeInput() {
        this.onTouch();
        this.onChange(this.currentValue());
    }

    setTimeNow() {
        const fdate = new DateHelper(new Date());
        let time: string;
        if (this.setType() === 'datetime-local') {
            time = fdate.getDataOfDate.fomatDatetime;
        }
        else if (this.setType() === 'time') {
            time = fdate.getDataOfDate.fomatTime;
        }
        else {
            time = fdate.getDataOfDate.fomatDate;
        }
        this.currentValue.set(time);
        this.changeInput();
    }
}
