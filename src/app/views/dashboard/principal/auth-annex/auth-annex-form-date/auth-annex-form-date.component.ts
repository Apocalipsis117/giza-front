import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
  selector: 'auth-annex-form-date',
  standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelTimeComponent,
        InputPanelSelectComponent,
        ReactiveFormsModule
    ],
  templateUrl: './auth-annex-form-date.component.html'
})
export class AuthAnnexFormDateComponent {
    private fb = inject(FormBuilder);
    form!: FormGroup;

    formDataCLone: any;
    formData: IForm<any> = {
    };

    constructor() {
        this.form = this.fb.group(this.formData);
        this.formDataCLone = ngFormHelper.unboxProperties(this.formData);
    }

    reset() {
        this.form.reset(this.formDataCLone);
    }
}
