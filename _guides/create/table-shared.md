# crear table

```ts
import { Component, input, computed, inject, signal } from '@angular/core';
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { DirectivesModule } from '@directive/module';
import { PipesModule } from '@pipes/module';
import { TestService } from '@services/index';

@Component({
    imports: [
        BladeTableComponent,
        ButtonComponent,
        DirectivesModule,
        PipesModule
    ]
})
export class TableRipconceptComponent {
    private readonly local$ = inject(TestService);
    public dataTable = input<any[]>([]);
    tdSelected = signal<number>(-1);

    load = computed(() => this.dataTable().length > 0);

    emit(data: any) {
        this.tdSelected.set(data.id);
        this.local$.emit(data);
    }

    // optional
    clean() {
        this.tdSelected.set(-1);
        this.local$.emit(null);
    }
}
```
table


```html
<blade-table [headDivider]="true" [bodyYDivider]="true" [ActiveLoad]="true" [load]="load()">
    <ng-container tableHead>
        <tr>
            <th>Item</th>
            <th class="text-end">Accion</th>
        </tr>
    </ng-container>
    <ng-container tableBody>
        @for(item of dataTable(); track item.id) {
            <tr>
                <td>---</td>
                <td class="text-end">
                    <app-button setIcon="icofont-info-circle" setSize="sm" (action)="emit(item)" />
                </td>
            </tr>
        }
    </ng-container>
</blade-table>
```

# using Directive TrSelected

```html
<tr TrSelected [idx]="tdSelected()" [id]="item.id">
```

# using Pipe TrSelected

__recomendado__ ya que es sensible al cambio

```html
<tr [ngClass]="item.id | trSelected: tdSelected()">
```

# inport table in component

acciones desde componente padre:

## clean

```ts
export class myComponent {
    readonly table = viewChild('table', { read: BladeTabsHorizontalComponent});

    // action bar
    barAction(e: ActionName) {
        else if (e === 'clean') this.table()?.clean();
    }

    //
    cleanTable() {
        this.table()?.clean()
    }
}
```

```html
<table-component #table />
```