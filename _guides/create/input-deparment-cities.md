# Deparmante cities

```ts
import { inject, signal } from '@angular/core';
import { queryData } from '@helpers/index';
import { CitiesOptionForm, OptionsForm } from '@interfaces/index';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';

@Component({
    imports: [
        InputPanelSelectComponent
    ]
})
export class MyComponent {
    countries$ = inject(ApartmentCitiesService);
    optionsDepartments = signal<CitiesOptionForm[]>([]);
    optionsCities = signal<OptionsForm[]>([]);

    ngOnInit(): void {
        this.countries$.getAll('options').subscribe(data => this.optionsDepartments.set(data));
        this.changeApartment();
    }

    changeApartment() {
        this.form().get('departmentId')!.valueChanges.subscribe(value => {
            if (value) {
                let cities = queryData.cities(value, this.optionsDepartments());
                this.optionsCities.set(cities)
            }
        })
    }
}
```

```html
<input-panel-select setLabel="Departamento" [setOptions]="optionsDepartment()" />
<input-panel-select setLabel="Municipio" [setOptions]="optionsCities()" [hiddenLoad]="true" />
```