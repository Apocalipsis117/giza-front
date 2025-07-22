import { Component, inject, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ngFormHelper } from '@helpers/index';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';
import { InputTextComponent } from '@im-inputs/input-text/input-text.component';
import { FormGroupTyped, IForm, NameStateEntity_API, NameStateEntity_APP, NameStateEntity_APPDTO } from '@interfaces/index';
import { ValidateStringEmpty } from '@valid-control/index';

@Component({
    selector: 'form-manual-transfer-rate',
    imports: [
        InputOnoffComponent,
        InputTextComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-manual-transfer-rate.component.html'
})
export class FormManualTransferRateComponent {
    private validates = viewChildren('validate');
    private readonly fb = inject(FormBuilder);

    form: FormGroup;
    formClone: NameStateEntity_APPDTO;
    formValues: IForm<NameStateEntity_APPDTO> = {
        name: [ '', [ ValidateStringEmpty() ] ],
        state: [ true ]
    };

    constructor() {
        this.form = this.fb.group(this.formValues);
        this.formClone = ngFormHelper.unboxProperties(this.formValues);
    }

    get control() {
        return this.form.controls as FormGroupTyped<NameStateEntity_APPDTO>;
    }

    reset() {
        this.form.reset(this.formClone);
        this.form.clearValidators();
        this.form.updateValueAndValidity();
    }

    validate() {
        this.validates()?.forEach((x: any) => x.validate());
    }

    markAlltouched() {
        this.form?.markAllAsTouched();
        this.validate();
    }

    setValues(data: NameStateEntity_APP) {
        const values: NameStateEntity_APPDTO = {
            name: data.name,
            state: data.state
        }
        this.form.setValue(values);
    }
}
