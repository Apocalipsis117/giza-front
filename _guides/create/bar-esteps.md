# steps

```ts
import { BarStepsComponent } from '@layouts/dashboard/bars/bar-steps/bar-steps.component';

@Component({
    imports: [
        BarStepsComponent
    ],
})
export class MyComponent {
    stepActive = signal<string | number>('');
    steps: StepAction[] = [
        {
            action: 'step-one',
            label: 'Paso 1',
            text: 'Queso'
        },
        {
            action: 'step-two',
            label: 'Paso 2',
            text: 'Yuca'
        }
    ];

    constructor() {
        // init step
        const stepActive = this.steps[0].action;
        this.stepActive.set(stepActive);
    }

    onStep(action: string) {
        this.stepActive.set(action);
    }
}
```

```html
<bar-steps [setSteps]="steps" [setActive]="stepActive()" (onStep)="onStep($event)" />
```

USE collapse
--

puedes cambiar de collapse segun el step accionado por medio de su `step.action`

```ts
import { BarStepsComponent } from '@layouts/dashboard/bars/bar-steps/bar-steps.component';
import { BladeCollapseBlockComponent } from '@layouts/dashboard/blades/blade-collapse-block/blade-collapse-block.component';
import { BladeBoxCollapseComponent } from '@layouts/dashboard/blades/blade-box-collapse/blade-box-collapse.component';

@Component({
    imports: [
        BladeBoxCollapseComponent,
        BarStepsComponent
    ],
})
export class MyComponent {
    private collpase = viewChild('collpase', { read: BladeBoxCollapseComponent});
    stepActive = signal<string | number>('');
    steps: StepAction[] = [
        {
            action: 'collapse-one',
            label: 'Paso 1',
            text: 'Queso'
        },
        {
            action: 'collapse-two',
            label: 'Paso 2',
            text: 'Yuca'
        }
    ];
    collapseControl: tabsControls[] = [
        {
            active: true,
            idConnect: 'collapse-one',
            label: 'Queso'
        },
        {
            active: false,
            label: 'Yuca',
            idConnect: 'collapse-two'
        }
    ]

    constructor() {
        // init step
        const stepActive = this.steps[0].action;
        this.stepActive.set(stepActive);
    }

    onStep(action: string) {
        this.stepActive.set(action);
        const collapse = this.collapseControl.find(x => x.idConnect === action);
        if(collapse) {
            this.collpase()?.show(collapse.idConnect)
        }
    }

    onCollapse(action: string) {
        this.stepActive.set(action);
    }
}
```

```html
<bar-steps [setSteps]="steps" [setActive]="stepActive()" (onStep)="onStep($event)" />
<blade-box-collapse idParent="form-patient" #collpase>
    <blade-collapse-block ... (onCollapse)="onCollapse($event)">
        <!-- content -->
    </blade-collapse-block>
</blade-box-collapse>
```