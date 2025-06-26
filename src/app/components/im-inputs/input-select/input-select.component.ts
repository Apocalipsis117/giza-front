import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { formHelper, generator } from '@helpers/index';
import { FormControlOption } from '@interfaces/index';

@Component({
    selector: 'input-select',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-select.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputSelectComponent),
        multi: true
    }],
    host: {
        "(window:click)": "windowClick($event.target)"
    }
})
export class InputSelectComponent {
    public readonly setLabel = input<string>('');
    public readonly emptyValue = input<'' | null>('');
    public readonly setPlaceholder = input<string>('Seleccionar');
    public readonly setOptions = input([], { transform: (value: FormControlOption[]) => formHelper.sortByName(value) });
    currentValue = signal<string | number>('');
    visible = signal<boolean>(false);
    id = generator.uuid('input');

    options = computed(() => ([
        { value: this.emptyValue(), name: this.setPlaceholder(), data: null },
        ...this.setOptions()
    ]));

    selected = computed(() => this.setOptions().find(value => value.value === this.currentValue()))

    windowClick(e: any): void {
        const active = e.closest('#' + this.id) ? !this.visible() : false;
        this.visible.set(active);
    }

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
    changeInput(e: any) {
        this.currentValue.set(e);
        this.change();
    }
    change() {
        this.onTouch();
        this.onChange(this.currentValue());
    }
}
