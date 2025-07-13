import { Component, computed, effect, ElementRef, forwardRef, input, signal, viewChildren } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { arrayControlHelper, formHelper, generator, ngFormHelper } from '@helpers/index';
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
    public setValidate = input<AbstractControl | null>(null);
    optionItems = viewChildren<ElementRef<HTMLLIElement>>('optionItem');
    public readonly setLabel = input<string>('');
    public readonly emptyValue = input<'' | null>(null);
    public readonly setSize = input<'sm' | 'lg' | null>(null);
    public readonly setPlaceholder = input<string>('Seleccionar');
    public readonly setOptions = input([], { transform: (value: FormControlOption[]) => formHelper.sortByName(value) });
    currentValue = signal<string | number>('');
    visible = signal<boolean>(false);
    currentIndex = signal<number>(-1);
    id = generator.uuid('input');
    error = signal<string | null>(null);

    validate() {
        ngFormHelper.validate(this.setValidate(), this.error);
    }

    constructor() {
        effect(() => {
            arrayControlHelper.autoScroll(
                this.currentIndex(),
                this.optionItems()
            );
        });
    }

    options = computed(() => ([
        { value: this.emptyValue(), name: this.setPlaceholder(), data: null },
        ...this.setOptions()
    ]));

    selected = computed(() => this.setOptions().find(value => value.value === this.currentValue()))
    size = computed(() => this.setSize() ? `input-group-${this.setSize()}` : '')

    windowClick(e: any): void {
        const active = e.closest('#' + this.id) ? !this.visible() : false;
        this.visible.set(active);
    }

    writeValue(obj: any): void {
        this.currentValue.set(obj || '');
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
    changeInput(e: any) {
        this.currentValue.set(e);
        this.change();
    }
    change() {
        this.onChange(this.currentValue());
        this.validate();
    }

    blur() {
        this.onTouch();
        this.validate();
    }

    onKeydown(event: KeyboardEvent) {
        arrayControlHelper.handleSelectKeyboardNav(event, {
            options: this.options(),
            currentIndex: this.currentIndex(),
            setCurrentIndex: idx => this.currentIndex.set(idx),
            onSelect: option => {
                this.visible.set(false),
                this.changeInput(option.value)
            },
            resetOnOtherKeys: true
        })
    }
}
