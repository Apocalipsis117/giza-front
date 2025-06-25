import { Component, inject, signal } from '@angular/core';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelTextareaComponent } from '@form-control/input-panel-textarea/input-panel-textarea.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';
import { TitleIconSectionComponent } from '@layouts/shared/title-icon-section/title-icon-section.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetalertService } from '@services/app';
import { ItemReferralObserverComponent } from '../item-referral-observer/item-referral-observer.component';

@Component({
    selector: 'data-referral-audit',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        TitleIconSectionComponent,
        InputPanelCheckboxComponent,
        InputPanelTextareaComponent,
        ItemReferralObserverComponent,
        ButtonComponent,
        ReactiveFormsModule
    ],
    templateUrl: './data-referral-audit.component.html'
})
export class DataReferralAuditComponent {
    swalert = inject(SweetalertService);
    observations = signal<any[]>([]);
    observation = this.fb.group({
        dotacion: ['', Validators.required],
        observacion: ['', Validators.required]
    })

    constructor(
        private fb: FormBuilder
    ) {}

    add() {
        if (this.observation.valid) {
            this.observations.update(x => [...x, this.observation.value]);
            this.observation.reset({
                dotacion: '',
                observacion: ''
            })
        } else {
            this.swalert.alertSimple('Llene los campos', 'warning')
        }
    }
}
