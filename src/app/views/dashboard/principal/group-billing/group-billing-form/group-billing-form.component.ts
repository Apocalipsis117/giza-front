import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'group-billing-form',
    standalone: true,
    imports: [
        InputPanelSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './group-billing-form.component.html'
})
export class GroupBillingFormComponent {
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
