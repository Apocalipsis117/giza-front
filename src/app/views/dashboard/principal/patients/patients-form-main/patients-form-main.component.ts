import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'patients-form-main',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputPanelTextComponent,
        InputPanelSelectComponent,
        InputPanelTimeComponent
    ],
    templateUrl: './patients-form-main.component.html'
})
export class PatientsFormMainComponent {
    private fb = inject(FormBuilder);
    form!: FormGroup;

    formDataCLone: any;
    formData: IForm<any> = {
        name: ['', Validators.required]
    }

    constructor() {
        this.form = this.fb.group(this.formData);
        this.formDataCLone = ngFormHelper.unboxProperties(this.formData)
    }

    reset() {
        this.form.reset(this.formDataCLone);
    }
}
