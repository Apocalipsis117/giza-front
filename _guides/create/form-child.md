# form-amin

```ts
import { Component, inject, viewChild } from '@angular/core';
import { ActionName } from '@interfaces/index';
import { SweetalertService, TestService } from '@services/app';
import { formChildComponent } from './form-child.component';

@Component({
    imports: [
        formChildComponent
    ],
})
export class ParentComponent {
    private formChild = viewChild('formChild', { read: formChildComponent });
    private readonly testServ = inject(TestService);
    private swal = inject(SweetalertService);

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        const formChild = this.formChild()?.form;
        if (formChild?.valid) {
            const dto = {
                ...formChild.value
            }
            this.swal.loading();
            this.testServ.post(dto).subscribe({
                next: () => {
                    this.swal.formSave('success');
                    this.reset();
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.formChild()?.reset();
    }
}

```

```html
<form-child #formChild />
```

si tienes integrado multiples form-child con `blade-box-collapse`, abre el collapse correspondiente

```ts
export class ParentComponent {
    private collpase = viewChild('collpase', { read: BladeBoxCollapseComponent});

    save() {
        const formA = this.formA()?.form;
        const formB = this.formB()?.form;
        if (formA?.valid && formB?.valid) {
            // actions save
        } else {
            this.swal.formSave('warning');
            if(!formA?.valid) this.collpase()?.show('form-a');
            if(!formB?.valid) this.collpase()?.show('form-b');
        }
    }
}
```


# form-child


```ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelSwitchComponent } from '@form-control/input-panel-switch/input-panel-switch.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'form-child',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelTimeComponent,
        InputPanelSwitchComponent,
        InputPanelSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './patients-form-main.component.html'
})
export class formChildComponent {
    private fb = inject(FormBuilder);
    form!: FormGroup;

    formDataCLone: any;
    formData: IForm<any> = {
    }

    constructor() {
        this.form = this.fb.group(this.formData);
        this.formDataCLone = ngFormHelper.unboxProperties(this.formData)
    }

    reset() {
        this.form.reset(this.formDataCLone);
    }
}

```

```html
<form [formGroup]="form">
    <div class="d-grid">
        <div class="col-span-12">
            <input-panel-text setLabel="Text" />
        </div>
        <div class="col-span-12">
            <input-panel-select setLabel="Options" />
        </div>
        <div class="col-span-12">
            <input-panel-switch setLabel="Check" />
        </div>
        <div class="col-span-12">
            <input-panel-time setLabel="Date" />
        </div>
    </div>
</form>
```