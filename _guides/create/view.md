# vista

```ts
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';

@Component({
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent
    ],
})
export class AppComponent {

}
```

```html
<blade-panel>
    <ng-container panels>
        <div class="d-grid">
            <div class="col-span-full">
                <blade-box-panel setTitle="Titulo">
                    <ng-container boxbody>
                        <p>Tres tristes tigres...</p>
                    </ng-container>
                </blade-box-panel>
            </div>
        </div>
    </ng-container>
</blade-panel>
```