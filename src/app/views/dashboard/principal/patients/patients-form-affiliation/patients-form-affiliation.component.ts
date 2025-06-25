import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'patients-form-affiliation',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputPanelSelectComponent
    ],
    templateUrl: './patients-form-affiliation.component.html'
})
export class PatientsFormAffiliationComponent {
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
