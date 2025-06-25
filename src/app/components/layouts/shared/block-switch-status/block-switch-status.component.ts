import { Component, input } from '@angular/core';
import { SwitchStatusComponent } from '../switch-status/switch-status.component';

@Component({
    selector: 'block-switch-status',
    standalone: true,
    templateUrl: './block-switch-status.component.html',
    imports: [
        SwitchStatusComponent
    ]
})
export class BlockSwitchStatusComponent {
    active = input<boolean>(false)
}
