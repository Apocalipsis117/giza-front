# Blade panel

```ts
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';

@Component({
    imports: [
        BladePanelComponent
    ]
})
```

@Input
---

__[disabledTools]__ <!-- boolean -->
__[disabledUse]__ <!-- boolean -->
__[hiddeTools]__ <!-- boolean -->
__[section]__ <!-- (interface) PanelNameSection : NOTA agregar nuevo si no exite -->
__[titleSection]__ <!-- string -->


```html
<blade-panel>
    <ng-container panels>
        content
    </ng-container>
</blade-panel>
```