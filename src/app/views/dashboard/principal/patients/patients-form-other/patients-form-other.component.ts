import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';
import { ValidateStringEmpty } from '@valid-control/index';

@Component({
    selector: 'patients-form-other',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputPanelTextComponent,
        InputPanelSelectComponent
    ],
    templateUrl: './patients-form-other.component.html'
})
export class PatientsFormOtherComponent {
    private fb = inject(FormBuilder);
    form!: FormGroup;

    formDataCLone: any;
    formData: IForm<any> = {
        name: ['', [ValidateStringEmpty()]]
    }

    constructor() {
        this.form = this.fb.group(this.formData);
        this.formDataCLone = ngFormHelper.unboxProperties(this.formData)
    }

    reset() {
        this.form.reset(this.formDataCLone);
    }
}
