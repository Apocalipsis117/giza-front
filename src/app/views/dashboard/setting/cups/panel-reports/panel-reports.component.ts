import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputPanelCheckboxComponent } from '@form-control/input-panel-checkbox/input-panel-checkbox.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'panel-reports',
    standalone: true,
    templateUrl: './panel-reports.component.html',
    imports: [
        CommonModule,
        InputPanelSelectComponent,
        ButtonComponent,
        InputPanelCheckboxComponent
    ]
})
export class PanelReportsComponent {

}
