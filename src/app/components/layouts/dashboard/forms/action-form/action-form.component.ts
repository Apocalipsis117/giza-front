import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ActionForm, UiSize } from '@interfaces/index';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'action-form',
    standalone: true,
    imports: [
        ButtonComponent,
        NgClass
    ],
    templateUrl: './action-form.component.html'
})
export class ActionFormComponent {
    setSize = input<UiSize>(null);
    action = output<ActionForm>();
    btnSave = input<Boolean>(true);
    btnReset = input<Boolean>(true);

    emit(action: ActionForm) {
        this.action.emit(action);
    }
}
