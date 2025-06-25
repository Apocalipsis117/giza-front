import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelSwitchComponent } from '@form-control/input-panel-switch/input-panel-switch.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'employees-form-auth',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelTimeComponent,
        InputPanelSwitchComponent,
        InputPanelSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './employees-form-auth.component.html'
})
export class EmployeesFormAuthComponent {
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
