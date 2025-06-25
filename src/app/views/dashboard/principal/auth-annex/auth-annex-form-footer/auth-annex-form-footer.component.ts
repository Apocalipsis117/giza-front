import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'auth-annex-form-footer',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelSelectComponent,
        ReactiveFormsModule,
        InputPanelTextareaComponent
    ],
    templateUrl: './auth-annex-form-footer.component.html'
})
export class AuthAnnexFormFooterComponent {
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
