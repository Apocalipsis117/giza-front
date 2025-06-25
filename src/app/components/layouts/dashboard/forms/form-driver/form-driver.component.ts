import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { InputPanelSelectComponent } from '@form-control/input-panel-select/input-panel-select.component';

@Component({
    selector: 'form-driver',
    standalone: true,
    imports: [CommonModule, InputPanelTextComponent, InputPanelSelectComponent],
    templateUrl: './form-driver.component.html'
})
export class FormDriverComponent {

}
