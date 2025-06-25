import { Component, EventEmitter, Output } from '@angular/core';
import { InputPanelTextComponent } from '@form-control/input-panel-text/input-panel-text.component';
import { UiSize } from '@interfaces/index';
import { ButtonComponent } from '@layouts/shared/button/button.component';

@Component({
    selector: 'form-control-items',
    standalone: true,
    imports: [
        InputPanelTextComponent,
        ButtonComponent
    ],
    templateUrl: './form-control-items.component.html'
})
export class FormControlItemsComponent {
    @Output() uiList = new EventEmitter<UiSize>();
    uiSelect: UiSize = 'sm';

    emitUi(e: UiSize) {
        this.uiSelect = e;
        this.uiList.emit(this.uiSelect);
    }
}
