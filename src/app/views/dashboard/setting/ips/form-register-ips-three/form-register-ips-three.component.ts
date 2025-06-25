import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { InputPanelTimeComponent } from '@form-control/input-panel-time/input-panel-time.component';
import { BillingIpsDTO_APP, IForm } from '@interfaces/index';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';

@Component({
    selector: 'form-register-ips-three',
    standalone: true,
    imports: [
        CommonModule,
        InputPanelTextComponent,
        InputPanelTextareaComponent,
        ReactiveFormsModule,
        TitleIconSectionComponent,
        InputPanelCheckboxComponent,
        InputPanelTimeComponent
    ],
    templateUrl: './form-register-ips-three.component.html'
})
export class FormRegisterIpsThreeComponent {
    setForm = input<FormGroup<IForm<BillingIpsDTO_APP>>>();
    form = computed(() => this.setForm() as FormGroup);
}
