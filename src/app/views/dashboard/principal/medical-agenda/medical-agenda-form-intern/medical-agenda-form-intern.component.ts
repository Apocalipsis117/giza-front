import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { ngFormHelper } from '@helpers/index';
import { IForm } from '@interfaces/index';

@Component({
    selector: 'medical-agenda-form-intern',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        InputPanelTimeComponent,
        InputPanelSelectComponent,
        InputPanelCheckboxComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './medical-agenda-form-intern.component.html'
})
export class MedicalAgendaFormInternComponent {
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
