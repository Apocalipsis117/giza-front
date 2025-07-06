import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlOption2 } from '@interfaces/index';

@Component({
    selector: 'input-select-add',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './input-select-add.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputSelectAddComponent),
        multi: true
    }]
})
export class InputSelectAddComponent {
    setOptions = input<FormControlOption2[]>([]);
    setLabel = input<string>('');
    setPlaceholder = input<string>('Buscar...');
    selectedValues = signal<(number | string)[]>([]);
    searchA = signal<string>(''); // filtro lado A
    searchB = signal<string>(''); // filtro lado B

    // Disponibles (A)
    available = computed(() => this.setOptions().filter(
        o => !this.selectedValues().includes(o.value)
            && `${o.name}`.toLowerCase().includes(this.searchA().toLowerCase())
    ));

    // Agregados (B)
    added = computed(() => this.setOptions().filter(
        o => this.selectedValues().includes(o.value)
            && `${o.name}`.toLowerCase().includes(this.searchB().toLowerCase())
    ));

    writeValue(obj: any): void {
        this.selectedValues.set(obj || []);
    }
    onChange = (_: any) => {};
    registerOnChange(fn: any) { this.onChange = fn; }
    onTouch = () => {};
    registerOnTouched(fn: any) { this.onTouch = fn; }

    add(value: number | string) {
        if (!this.selectedValues().includes(value)) {
            this.selectedValues.update(vals => [...vals, value]);
            this.onChange(this.selectedValues());
            this.searchA.set('');
        }
    }
    remove(value: number | string) {
        this.selectedValues.update(vals => vals.filter(v => v !== value));
        this.onChange(this.selectedValues());
    }

    // Agrega todos los disponibles
    addAll() {
        const allAvailable = this.setOptions()
            .filter(o => !this.selectedValues().includes(o.value))
            .map(o => o.value);
        if (allAvailable.length) {
            this.selectedValues.update(vals => [...vals, ...allAvailable]);
            this.onChange(this.selectedValues());
            this.searchA.set('');
        }
    }

    // Quita todos los agregados
    removeAll() {
        this.selectedValues.set([]);
        this.onChange(this.selectedValues());
        this.searchB.set('');
    }
}