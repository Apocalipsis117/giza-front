import { Component, computed, effect, ElementRef, forwardRef, input, signal, viewChild, viewChildren } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { arrayControlHelper, compareHelper, formHelper, generator, ngFormHelper } from '@helpers/index';
import { FormControlOption } from '@interfaces/index';

@Component({
    selector: 'input-select-searh',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './input-select-searh.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputSelectSearhComponent),
        multi: true
    }],
    host: {
        "(window:click)": "windowClick($event.target)"
    }
})
export class InputSelectSearhComponent {
    optionItems = viewChildren<ElementRef<HTMLLIElement>>('optionItem');
    public setValidate = input<AbstractControl | null>(null);
    public readonly emptyValue = input<'' | null>('');
    public readonly setPlaceholder = input<string>('Seleccionar');
    public readonly setLabel = input<string>('');
    public readonly setOptions = input([], { transform: (value: FormControlOption[]) => formHelper.sortByName(value) });
    private inputSearch = viewChild<ElementRef>('inputSearch');
    currentValue = signal<string | number | null>('');
    valuePlaceholder = signal<string>('');
    searchValue = signal<string>('');
    visible = signal<boolean>(false);
    id = generator.uuid('input');
    idContainer = this.id + 'container';
    currentIndex = signal<number>(-1);
    error = signal<string | null>(null);

    constructor() {
        effect(() => {
            const idx = this.currentIndex();
            const items = this.optionItems();
            if (idx >= 0 && idx < items.length) {
                items[idx]?.nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        });
    }

    validate() {
        ngFormHelper.validate(this.setValidate(), this.error);
    }

    options = computed(() => {
        const options = [
            { value: this.emptyValue(), name: this.setPlaceholder(), data: null },
            ...this.setOptions()
        ];
        return options.filter(x => compareHelper.compareString(x.name, this.searchValue()).includesText);
    });

    selected = computed(() => this.setOptions().find(value => value.value === this.currentValue()));

    windowClick(e: any): void {
        if (e.closest('#' + this.idContainer)) {
            if (e.id === this.id) this.visible.set(!this.visible());
            setTimeout(() => this.inputSearch()?.nativeElement.focus(), 100);
        } else {
            this.visible.set(false);
        }
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
    changeInput() {
        this.onChange(this.currentValue());
        this.validate();
    }

    select(value: string | number | null) {
        this.currentValue.set(value);
        this.clean();
        this.changeInput();
    }

    clean() {
        this.visible.set(false);
        this.searchValue.set('');
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
            onSelect: option => this.select(option.value),
            resetOnOtherKeys: true
        })
    }
}
