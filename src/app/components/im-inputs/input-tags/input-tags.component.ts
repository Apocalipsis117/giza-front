import { Component, computed, effect, ElementRef, forwardRef, input, signal, viewChildren } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { arrayControlHelper, compareHelper, formHelper, generator, ngFormHelper } from '@helpers/index';
import { FormControlOption, FormControlValue } from '@interfaces/index';

@Component({
    selector: 'input-tags',
    imports: [
        FormsModule
    ],
    templateUrl: './input-tags.component.html',
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputTagsComponent),
            multi: true
        }],
    host: {
        "(window:click)": "windowClick($event.target)"
    }
})
export class InputTagsComponent {
    public setValidate = input<AbstractControl | null>(null);
    optionItems = viewChildren<ElementRef<HTMLLIElement>>('optionItem');
    public setLabel = input<string>('');
    public setOptions = input([], { transform: (value : FormControlOption[]) =>  formHelper.sortByName(value)});
    currentValue = signal<FormControlValue[]>([]);
    searchValue = signal<string>('');
    setPlaceholder = signal<string>('Vacio');
    visible = signal<boolean>(false);
    currentIndex = signal<number>(-1);
    id = generator.uuidShort('tags');
    idConnect = `${this.id}-connect`;
    error = signal<string | null>(null);

    constructor() {
        effect(() => {
            arrayControlHelper.autoScroll(
                this.currentIndex(),
                this.optionItems()
            );
        });
    }

    validate() {
        ngFormHelper.validate(this.setValidate(), this.error);
    }

    options = computed(() => {
        const options = this.setOptions().filter(element => !this.currentValue().includes(element.value));
        return options.filter(x => compareHelper.compareString(x.name, this.searchValue()).includesText);
    });

    allSelected = computed(() => {
        return this.setOptions().length === this.currentValue().length;
    });

    hasAvailable = computed(() => this.options().length > 0);

    selected = computed(() => formHelper.filterAndSortItems(this.setOptions(), this.currentValue()));

    messageEmpty = computed(() => !this.hasAvailable() ? this.setPlaceholder() : '');

    windowClick(e: any): void {
        const active = e.closest('#' + this.id) ? !this.visible() : false;
        this.visible.set(active);
    }

    writeValue(obj: any): void {
        this.currentValue.set(obj || []);
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
        this.onTouch();
        this.onChange(this.currentValue());
        this.validate();
    }
    add(value: FormControlValue) {
        this.currentValue.update(values => [...values, value]);
        this.searchValue.set('');
        this.changeInput();
    }

    remove(value: FormControlValue) {
        this.currentValue.update(values => [...values.filter(tag => tag !== value)]);
        this.changeInput();
    }

    onKeydown(event: KeyboardEvent) {
        arrayControlHelper.handleSelectKeyboardNav(event, {
            options: this.options(),
            currentIndex: this.currentIndex(),
            setCurrentIndex: idx => this.currentIndex.set(idx),
            onSelect: option => this.add(option.value),
            resetOnOtherKeys: true
        })
    }
}
