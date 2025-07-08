import { Component, computed, forwardRef, inject, input, output, signal } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { FormControlOption } from '@interfaces/index';
import { SweetalertService } from '@services/app';

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
    public onSelect = output<string | number | null>();
    public setValidate = input<AbstractControl | null>(null);
    private readonly swa$ = inject(SweetalertService);
    setOptions = input<FormControlOption[]>([]);
    setLabel = input<string>('');
    setPlaceholder = input<string>('Buscar...');
    selectedValues = signal<(number | string | null)[]>([]);
    searchA = signal<string>(''); // filtro lado A
    searchB = signal<string>(''); // filtro lado B
    error = signal<string | null>(null);

    validate() {
        ngFormHelper.validate(this.setValidate(), this.error);
    }

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
        this.error.set(null);
    }
    onChange = (_: any) => {};
    registerOnChange(fn: any) { this.onChange = fn; }
    onTouch = () => {};
    registerOnTouched(fn: any) { this.onTouch = fn; }

    add(value: number | string | null) {
        if (!this.selectedValues().includes(value)) {
            this.selectedValues.update(vals => [...vals, value]);
            this.onChange(this.selectedValues());
            this.searchA.set('');
            this.validate();
        }
    }
    remove(value: number | string | null) {
        this.selectedValues.update(vals => vals.filter(v => v !== value));
        this.onChange(this.selectedValues());
        this.validate();
    }

    // Agrega todos los disponibles
    addAll() {
        const allAvailable = this.setOptions()
            .filter(o => !this.selectedValues().includes(o.value as any))
            .map(o => o.value);
        if (allAvailable.length) {
            this.selectedValues.update(vals => [...vals, ...allAvailable]);
            this.onChange(this.selectedValues());
            this.searchA.set('');
        }
        this.validate();
    }

    // Quita todos los agregados
    removeAll() {
        this.swa$.alertSimpleConfirm('¿Seguro que desea eliminar todo?').then(value => {
            if(value.isConfirmed) {
                this.selectedValues.set([]);
                this.onChange(this.selectedValues());
                this.searchB.set('');
            }
        })
        this.validate();
    }
}