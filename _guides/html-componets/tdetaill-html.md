```ts
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';

@Component({
    imports: [
        BlockSwitchStatusComponent
    ]
})
```

```html
<div class="d-grid">
    <div class="col-span-full mb-2 text-xl">
        Title
    </div>
    <div class="col-span-full mb-2">
        <h2 class="text-xl">Title</h2>
        <ul>
            <li><b>CC:</b> 1000</li>
        </ul>
    </div>
    <ul class="col-span-full ul-list-row">
        <li>
            <div class="col-span-6">
                <small>Title</small>
                <div>___</div>
            </div>
            <div class="col-span-6">
                <small>Title</small>
                <div>___</div>
            </div>
        </li>
    </ul>
    <div class="col-span-full font-bold">
        <i class="icofont-settings mr-2"></i>
        Opciones
    </div>
    <ul class="col-span-full divide-y">
        <li>
            <block-switch-status [active]="true">
                Title
            </block-switch-status>
        </li>
    </ul>
</div>
```
