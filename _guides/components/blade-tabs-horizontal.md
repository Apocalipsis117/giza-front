Implementar balde-tabs-horizontal
---

```ts
import { BladeTabsHorizontalComponent } from '@layouts/dashboard/blades/blade-tabs-horizontal/blade-tabs-horizontal.component';
import { DirectivesModule } from '@directive/module';
import { tabsControls } from '@interfaces/index';

@Component({
    imports: [
        BladeTabsHorizontalComponent,
        DirectivesModule
    ]
})
export class NewAuditComponent {
    private tabController = viewChild('tabController', { read: BladeTabsHorizontalComponent}); // optional

    tabsControls: tabsControls[] = [
        {
            active: true,
            idConnect: 'tab-content-a',
            label: 'title a'
        },
        {
            active: false,
            idConnect: 'tab-content-b',
            label: 'title b'
        }
    ];

    // optional
    showTab(id: number) {
        this.tabController()?.showTab(this.tabsControls[id].idConnect);
    }
}
```

@Input
---
__[tabsControls]__ <!-- tabsControls[] : required -->
__[setTitle]__ <!-- string -->
__[rounded]__ <!-- bool -->

@Output
---
__(action)__ <!-- myfun($event) :  tabsControls -->

Ref
---
#tabController

```html
<blade-tabs-horizontal [tabsControls]="tabsControls" setTitle="Title">
    <ng-container tabsBody>
        <article bsTabContent [idConnect]="tabsControls[0].idConnect" [isActive]="tabsControls[0].active">
            title a
        </article>
        <article bsTabContent [idConnect]="tabsControls[1].idConnect" [isActive]="tabsControls[1].active">
            title b
        </article>
    </ng-container>
</blade-tabs-horizontal>
```