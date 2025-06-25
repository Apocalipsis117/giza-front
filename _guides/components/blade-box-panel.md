# Box PAnel

```ts
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';

@Component({
    imports: [
        BladeBoxPanelComponent
    ]
})
```

@Input
---

__[setTitle]__ <!-- string -->
__[actionsActive]__ <!-- bool -->
__[headerActive]__ <!-- bool -->
__[setIcon]__ <!-- string -->
__[padding]__ <!-- bool -->
__[ui]__ <!-- string = UiBoxpanel.i -->

@output
---

__(actionBar)__ <!-- string = ActionName.i -->


```html
<blade-box-panel>
    <ng-container boxHead>
        head
    </ng-container>
    <ng-container boxbody>
        body
    </ng-container>
</blade-box-panel>
```