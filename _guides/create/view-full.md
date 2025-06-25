# estructura view

- local-main.service.ts
- main.component.ts
- main.component.html
    - table-main
    - tdetail-main
    - form-main

## View basic

```ts
import { BladePanelComponent } from '@layouts/dashboard/blades/blade-panel/blade-panel.component';
import { BladeBoxPanelComponent } from '@layouts/dashboard/blades/blade-box-panel/blade-box-panel.component';
import { NoteComponent } from '@layouts/shared/note/note.component';

@Component({
    imports: [
        BladePanelComponent,
        BladeBoxPanelComponent,
        NoteComponent
    ],
})
export class ViewComponent {

}
```


```html
<blade-panel>
    <ng-container panels>
        <div class="d-grid">
            <div class="col-span-8 space-y-3">
                <div class="w-full">
                    <blade-box-panel setTitle="Nuevo" [padding]="true">
                        <ng-container boxbody>
                            form
                        </ng-container>
                    </blade-box-panel>
                </div>
                <div class="w-full">
                    <blade-box-panel setTitle="tabla">
                        <ng-container boxbody>
                            table
                        </ng-container>
                    </blade-box-panel>
                </div>
            </div>
            <div class="col-span-4">
                <blade-box-panel setTitle="Detail" [padding]="true">
                    <ng-container boxbody>
                        tdetail
                    </ng-container>
            </blade-box-panel>
            </div>
        </div>
    </ng-container>
</blade-panel>

<app-note>
    <ng-container noteBody>
NOTE
    </ng-container>
</app-note>
```

## view with tab-controlle