import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'form-update-cum',
    standalone: true,
    imports: [
        CommonModule,
        InputPanelTextComponent,
        ButtonComponent
    ],
    templateUrl: './form-update-cum.component.html'
})
export class FormUpdateCumComponent {

}
