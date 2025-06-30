import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOnoffComponent } from '@im-inputs/input-onoff/input-onoff.component';

@Component({
    selector: 'block-switch-status',
    standalone: true,
    templateUrl: './block-switch-status.component.html',
    imports: [
        InputOnoffComponent,
        FormsModule
    ]
})
export class BlockSwitchStatusComponent {
    active = input<boolean>(false)
}
