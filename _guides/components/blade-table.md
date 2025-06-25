Import table
---

```ts
import { BladeTableComponent } from '@layouts/dashboard/blades/blade-table/blade-table.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    imports: [
        BladeTableComponent,
        ButtonComponent
    ],
})
```

@Input
---
__[activeSearch]__ <!-- bool -->
__[headDivider]__ <!-- bool -->
__[bodyXDivider]__ <!-- bool -->
__[bodyYDivider]__ <!-- bool -->
__[hover]__ <!-- bool -->
__[rounded]__ <!-- bool -->
__[load]__ <!-- bool -->
__[ActiveLoad]__ <!-- bool -->
__[tableSize]__ <!-- bool -->

@Output
---
(search)="myfun($event)"


```html
<blade-table>
    <ng-container tableCols>
        <!-- <col> -->
    </ng-container>
    <ng-container tableHead>
        <tr>
            <th>head</th>
            <th class="text-end">Accion</th>
        </tr>
    </ng-container>
    <ng-container tableBody>
        <tr>
            <td>body</td>
            <td class="text-end">
                <app-button setIcon="icofont-info-circle" setSize="sm" />
            </td>
        </tr>
    </ng-container>
</blade-table>

```
