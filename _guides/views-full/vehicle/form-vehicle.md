# FORM

```ts
import { Component, inject, signal, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputDateComponent } from '@im-inputs/input-date/input-date.component';
import { InputNumberComponent } from '@im-inputs/input-number/input-number.component';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputSelectComponent } from '@im-inputs/input-select/input-select.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { InputTextareaComponent } from '@im-inputs/input-textarea/input-textarea.component';
import { FormControlOption, FormGroupTyped, IForm, Todo_APPDTO } from '@interfaces/index';
import { ValidateStringEmpty, ValidateParagraphText, ValidStrict, ValidateNumberEmpty } from '@valid-control/index';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'form-vehicles',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextareaComponent,
        InputTextComponent,
        InputOnoffComponent,
        InputSelectComponent,
        InputNumberComponent,
        InputDateComponent
    ],
    templateUrl: './form-vehicles.component.html'
})
export class FormVehiclesComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);
    private readonly Test$ = inject(TestService);

    optionsTest = signal<FormControlOption[]>([]);

    form: FormGroup;
    formClone: Todo_APPDTO;
    formValues: IForm<Todo_APPDTO> = {
        todo: ['', [ValidateStringEmpty()]],
        description: ['', [ValidateParagraphText()]],
        typeTodoUuid: [null, [ValidStrict()]],
        status: [false],
        days: [NaN, [ValidateNumberEmpty()]],
        dateEnd: [''],
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<Todo_APPDTO>;
    }

    ngOnInit(): void {
        this.queryApiStatic();
    }

    queryApiStatic() {
        const obs = forkJoin({
            test: this.Test$.getOptions('options'),
        });

        obs.subscribe({
            next: (value) => {
                this.optionsTest.set(value.test);
            }
        });
    }

    reset() {
        this.form.reset(this.formClone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate())
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }

    setValues(values: Todo_APPDTO) {
        this.form.setValue(values);
    }
}

```

```html
<form [formGroup]="form">
    <div class="d-grid">
        <div class="col-span-4">
            <input-text setLabel="Hacer" formControlName="todo" [setValidate]="control['todo']" #validate />
        </div>
        <div class="col-span-4">
            <input-select setLabel="Tipo" formControlName="typeTodoUuid" [setOptions]="optionsTest()" [setValidate]="control['typeTodoUuid']" #validate />
        </div>
        <div class="col-span-4">
            <input-date setLabel="Fecha Fin" formControlName="dateEnd" [setValidate]="control['dateEnd']" #validate />
        </div>
        <div class="col-span-6">
            <input-onoff setLabel="Estado" formControlName="status" />
        </div>
        <div class="col-span-6">
            <input-text setLabel="Dias" formControlName="days" [setValidate]="control['days']" #validate />
        </div>
        <div class="col-span-12">
            <input-textarea setLabel="Descripción" formControlName="description" />
        </div>
    </div>
</form>
```