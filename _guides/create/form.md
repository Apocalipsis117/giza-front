# Create Form

```ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { IForm,ActionName } from '@interfaces/index';
import { TestService, SweetalertService } from '@services/app';
import { ActionFormComponent } from '@layouts/dashboard/forms/action-form/action-form.component'; // opcional

@Component({
    imports: [
        ActionFormComponent // opcional
    ]
})
export class AppComponent {
    private readonly testServ = inject(TestService);
    private swal = inject(SweetalertService);
    private fb = inject(FormBuilder);
    form!: FormGroup;

    formDataCLone: any;
    formData: IForm<any> = {
    }

    constructor() {
        this.form = this.fb.group(this.formData);
        this.formDataCLone = ngFormHelper.unboxProperties(this.formData)
    }

    barAction(e: ActionName) {
        if (e === 'save') this.save();
        else if (e === 'reset') this.reset();
    }

    save() {
        if(this.form.valid) {
            this.swal.loading();
            this.testServ.post(this.form.value).subscribe({
                next: (data) => {
                    // console.info("data", data);
                    this.swal.formSave('success');
                    this.reset();
                    // this.showTab(1);
                },
                error: () => this.swal.formSave('error')
            });
        } else {
            this.swal.formSave('warning');
        }
    }

    reset() {
        this.form.reset(this.formDataCLone);
    }
}
```

## action-form

```html
<form-child [setForm]="form" />

<div class="block mt-5">
    <action-form (action)="barAction($event)" />
</div>
```

## Usando box-panel

```html
<blade-box-panel (actionBar)="barAction($event)">
    ...
    <ng-container boxHead>
        <action-form setSize="sm" />
    </ng-container>
</blade-box-panel>
```


## Si estoy usando blade-tabs-hoizontal

si quieres que cambie de tap al guardar formulario, lee la siguiente __GUIA__

```ts
export class AppComponent {
    @ViewChild('tabController') tabController!: BladeTabsHorizontalComponent;

    save() {
        // agregar a respuesta del servicio
        this.showTab(1);
    }

    // redirection to tab
    showTab(id: number) {
        this.tabController.showTab(this.tabsControls[id].idConnect);
    }
}
```

## setForm form-child

setear form por input de form-child

```ts
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { AssistanceServDTO_APP } from '@interfaces/app';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'form-assistance-service',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputPanelTextComponent,
        InputPanelSelectComponent
    ],
    templateUrl: './form-assistance-service.component.html'
})
export class FormAssistanceServiceComponent {
    public setForm = input<FormGroup<IForm<any>>>();

    form = computed(() => this.setForm() as FormGroup);
}
```

```html
<form [formGroup]="form()">
    <div class="d-grid">
        <div class="col-span-12">
            <input-panel-text setLabel="Name" />
        </div>
    </div>
</form>
```