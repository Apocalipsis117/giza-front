import { Component, computed, effect, ElementRef, forwardRef, input, signal, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { arrayControlHelper, compareHelper, formHelper, generator } from '@helpers/index';
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

    select(value: string | number | null) {
        this.currentValue.set(value);
        this.clean();
        this.changeInput();
    }

    clean() {
        this.visible.set(false);
        this.searchValue.set('');
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
