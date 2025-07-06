import { Component, inject, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormGroupTyped, IForm, NameIdEntity_APPDTO } from '@interfaces/index';
import { ValidateStringEmpty } from '@valid-control/index';

@Component({
    selector: 'form-adverse-events',
    imports: [
        InputTextComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-adverse-events.component.html'
})
export class FormAdverseEventsComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);

    form: FormGroup;
    formClone: NameIdEntity_APPDTO;
    formValues: IForm<NameIdEntity_APPDTO> = {
        name: ['', [ValidateStringEmpty()]]
    }

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<NameIdEntity_APPDTO>;
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

    setValues(values: NameIdEntity_APPDTO) {
        this.form.setValue(values);
    }
}
