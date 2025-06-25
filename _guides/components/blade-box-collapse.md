# blade-box-collapse

```ts
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';

@Component({
    imports: [
        BladeCollapseBlockComponent,
        BladeBoxCollapseComponent
    ]
})
export class appComponent {
    readonly collpaseController = viewChild('collpaseController', { read: BladeBoxCollapseComponent});
    collapseControl: tabsControls[] = [
        {
            active: true,
            idConnect: 'box-collapse-a',
            label: 'title a',
            icon: 'icofont-home'
        },
        {
            active: false,
            idConnect: 'box-collapse-b',
            label: 'title b',
            icon: 'icofont-home'
        }
    ];

    // optional
    showCollapse() {
        this.collpase()?.show(this.collapseControl[1].idConnect)
    }
}
```

@Input
---

__[idParent]__ <!-- string -->

```html
<blade-box-collapse idParent="form-patient" #collpaseController>
    <!-- blade-collapse-block -->
</blade-box-collapse>
```

# blade-collapse-block

@Input
---

__[idParent]__ <!-- string -->
__[setTitle]__ <!-- string -->
__[setIcon]__ <!-- string -->
__[isActive]__ <!-- boolean -->
__[idConnect]__ <!-- string !required -->

```html
<blade-collapse-block idParent="form-patient" [idConnect]="collapseControl[0].idConnect" [setTitle]="collapseControl[0].label" [setIcon]="collapseControl[0].icon" [isActive]="collapseControl[0].active">
    content
</blade-collapse-block>
```

Usando @for @switch
--

estructura completa usando iteracion

```html
<blade-box-collapse idParent="form-patient" #collpase>
    @for(comp of collapseControl; track comp.idConnect) {
        <blade-collapse-block
            idParent="form-patient"
            [idConnect]="comp.idConnect"
            [setTitle]="comp.label"
            [setIcon]="comp.icon"
            [isActive]="comp.active"
        >
        @switch(comp.idConnect) {
            @case(collapseControl[0].idConnect) {
                <p>queso A</p>
            }
            @case(collapseControl[1].idConnect) {
                <p>queso B</p>
            }
        }
        </blade-collapse-block>
    }
</blade-box-collapse>
```