# Tdetail component

```ts
import { Component, computed, inject, signal } from '@angular/core';
import { BlockItemInfoComponent } from '@layouts/dashboard/block/block-item-info/block-item-info.component';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';
import { TestService } from '@services/app';

@Component({
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent,
        BlockItemInfoComponent
    ],
})
export class TdetailHospitalServicesComponent {
    data = signal<any | null>(null); // replace any with your interface
    localServ = inject(TestService);

    ngOnInit(): void {
        this.localServ.watchData.subscribe(data => this.data.set(data));
    }

    value = computed(() => {
        return {
            name: this.data()!.name,
        }
    })
}
```


```html
@if(data()) {
<div class="d-grid">
    <div class="col-span-full mb-2 text-xl">{{ value().name }}</div>
    <ul>
        <li><block-item-info setLabel="Edad:" setText="22" /></li>
    </ul>
    <ul class="col-span-full ul-list-row">
        <li>
            <div class="col-span-6">
                <small>Title</small>
                <div>---</div>
            </div>
            <div class="col-span-6">
                <small>Title</small>
                <div>---</div>
            </div>
        </li>
    </ul>
    <div class="col-span-full font-bold"><i class="icofont-settings mr-2"></i> Opciones</div>
    <ul class="col-span-full divide-y">
        <li>
            <block-switch-status [active]="true">Title</block-switch-status>
        </li>
        <li>
            <block-switch-status [active]="true">Title</block-switch-status>
        </li>
    </ul>
</div>
} @else {
    <select-some-item />
}
```

## data by @Input()

```ts
import { Component, computed, input } from '@angular/core';
import { SelectSomeItemComponent } from '@layouts/dashboard/ux/select-some-item/select-some-item.component';
import { BlockSwitchStatusComponent } from '@layouts/shared/block-switch-status/block-switch-status.component';

@Component({
    imports: [
        BlockSwitchStatusComponent,
        SelectSomeItemComponent
    ]
})
export class AnnexThreePatientComponent {
    data = input<any | null>(null);

    value = computed(() => {
        return {
            name: this.data()!.name,
        };
    });
}

```

